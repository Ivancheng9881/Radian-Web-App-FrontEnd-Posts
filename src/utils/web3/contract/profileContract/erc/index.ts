import ERCUtils from "../../../context/erc.utils";
import { gasStationNetworkUrl, subgraphUrlRoot } from '../../../../../commons/web3';
import { fetchDataFromSubgraph } from "../../../subgraph/subgraph.utils"; 
import { ERCProfile } from "./index.interface";
import { ContractTransaction, Transaction } from "ethers";
import ErrorHandler from "../../../../errorHandler";
import ProfileContract__evm__config from "./config";
import { getTagWithSignature } from "..";


const profileContract__evm__abi = ProfileContract__evm__config.abi;
const profileContract__evm__address = ProfileContract__evm__config.address;
const paymasterAddress = ProfileContract__evm__config.payMasterAddress;
const subgraphEnabled = ProfileContract__evm__config.subgraph.enabled;
const subgraphUrl = `${subgraphUrlRoot}/${ProfileContract__evm__config.subgraph.graphId}`

async function initProfileContract(readOnly=false) {
    return await ERCUtils.initContract(
        profileContract__evm__address,
        profileContract__evm__abi,
        readOnly
    );
}

async function initGaslessProfileContract() {
    const config = {
        preferredRelays: [gasStationNetworkUrl],
        relayLookupWindowBlocks: 750, // don't set too low, if too low, our relay server will be omitted
        relayRegistrationLookupBlocks: 750,
        auditorsCount: 0,
        paymasterAddress,
    }
    return await ERCUtils.initContractGasless(
        profileContract__evm__address,
        profileContract__evm__abi,
        config
    );
}

async function getProfilesFromSubgraph(skip: number, limit: number) {
    let query = `
        query Profile($skip: Int!, $limit: Int!) {
            profiles(skip: $skip, first: $limit) {
                profileID
                identityID
            }
        }
    `;
    let params = {skip: skip, limit: limit};
    let result = await fetchDataFromSubgraph(subgraphUrl, query, params);
    return result.data.profiles;
}

async function getProfileListCountFromSubgraph() {
    // TODO set up a graph for metadata, reduce data fetched from api
    let query = `query { profiles {id} }`;
    const result = await fetchDataFromSubgraph(subgraphUrl, query);
    let count = result.data.profiles.length;
    return count
}

export async function getProfileFromIDSubgraph(pid: number) {
    
    let query = `
        query Profile($profileID: BigInt!) {
            profiles(first: 1, where: {profileID: $profileID}) {
                identityID
                addresses {
                    address
                }
                externalAddresses {
                    externalAddress
                    networkID
                }
            }
        }
    `;
    let params = {profileID: pid};
    let result;
    try {
        result = await fetchDataFromSubgraph(subgraphUrl, query, params);
        let profile = result.data.profiles[0];
        return profile;
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

async function getProfileFromAddressSubgraph(address: string) {
    
    let query = `
        query Addresses($address: String!) {
            addresses(first: 5, where: {address: $address}) {
                profile {
                    profileID
                    identityID
                }
            }
        }
    `;
    let params = {address: address};
    let result;
    try {
        result = await fetchDataFromSubgraph(subgraphUrl, query, params);
        console.log(result.data.addresses[0].profile.identityID);
        let profile = result.data.addresses[0].profile;
        return profile;
    } catch {
        return undefined;
    }
}

export async function getProfileFromID(id: number) {
    let contract = await initProfileContract(true);
    return await contract.getProfilefromID(id);
}

export async function getProfileListCountErc(): Promise<number> {
    let count: number;
    if ( subgraphEnabled ) { // if subgraph is available, else directly query the smart contract
        count = await getProfileListCountFromSubgraph();
    } else {
        let contract = await initProfileContract(true);
        count = await contract.getProfilesCount();
    }
    return count
}

export async function getProfileListErc(
    skip: number, 
    limit: number
    ) : Promise<ERCProfile[] | null> {
    
    let identityIds: string[]  = [];
    let profileList: ERCProfile[] = [];

    if ( subgraphEnabled ) { 
        // run if subgraph is available
        let profiles: ERCProfile[] = await getProfilesFromSubgraph(skip, limit);
        profiles.map((p) => {
            let _p : ERCProfile  = {...p};
            _p.network = 'ERC'
            profileList.push(_p);
        });
        return profileList
    } 
    else { 
        // directly read from contract
        let arr: number[] = [];
        for (let i : number = skip + 1; i < limit + skip + 1; i++) {
            arr.push(i);
        }

        let profiles: ERCProfile[] | void = await Promise.all(
            arr.map(async (id) => { return await getProfileFromID(id) })
        )
            .then(resp => resp)
            .catch(err => console.log('Error in getting profile list', err))

        if (!profiles) return null;
        
        profiles.forEach((p) => {
            if (!identityIds.includes(p.identityID)) {
                let _p: ERCProfile = {...p};
                _p.network = "ERC";
                identityIds.push(p.identityID)
                profileList.push(_p)
            }
        })

        return profileList
    }
};


export async function getProfileErc(address?: string) {
    console.log("Calling Get Profile ERC");
    try {
        if (!address) {
            address = await ERCUtils.getAddress();
        }
        console.log('getProfileErc Address:', address);
        if ( subgraphEnabled && false ) return getProfileFromAddressSubgraph(address);

        let contract = await initProfileContract();
        let profileMapping = (await contract.addressProfileMapping(address)).toNumber();
        if (profileMapping == 0) {
            throw(ErrorHandler(4200));
        } else {
            let _profile = await contract.getProfilefromAddressV2(address);
            return {
                ..._profile[1],
                profileID: _profile[0].toString()
            };
        }
    } catch (err) {
        console.log(err);
        throw(err)
    }
}

async function createTag(cid: string, tags?: string[]) {

    try {
        const res = await getTagWithSignature(cid, tags);
        return res;
    } catch(err) {
        throw(err);
    }
    
}

// write requests
export async function createProfileErc(
    identityID: string, 
    useGasStation: boolean
    ) {

    let hasProfile: boolean = false;
    let tagResponse;

    try {
        await getProfileErc();
        hasProfile = true;
    } catch(err: any) {
        if (err.code === 4200) {
            hasProfile = false;
        }
    }

    try {
        tagResponse = await createTag(identityID);
    } catch(err) {
        throw(err);
    }

    let contract = useGasStation ? await initGaslessProfileContract() : await initProfileContract();
    try {
        let txn;

        if (hasProfile) {
            // perform update
            txn = await contract.updateProfileWithTags(
                identityID,
                tagResponse.tag,
                tagResponse.deadline,
                tagResponse.v,
                tagResponse.r,
                tagResponse.s
                )
        } else {
            txn = await contract.createProfileWithTags(
                identityID,
                tagResponse.tag,
                tagResponse.deadline,
                tagResponse.v,
                tagResponse.r,
                tagResponse.s
            )
            return txn
        }
    } catch(err) {
        console.log(err);
        throw(err);
    }

};

export async function hasPersonalProfileErc (walletAddress: string) {
    if ( subgraphEnabled ) {
        if ( (await getProfileFromAddressSubgraph(walletAddress) != undefined ) ) {
            return true;
        };
    } else {
        let profileResp = await getProfileErc(walletAddress);
        if (profileResp != undefined) {
            return true;
        }
    }
    return false;
};

/**
 * function for linking profile
 */

type AddAddressNetwork = 'erc' | 'solana';

export async function addAddressToProfile(address: string, isManager?: boolean) {
    const contract = await initProfileContract();
    try {
        const txn: ContractTransaction = await contract.addAddressToProfile(address, isManager);
        return txn;

    } catch(err) {
        throw({err})
    }
};

/**
 * 
 * @throws 4390 if no external network has been initialised for the DID contract
 * @returns total number of external network supports
 */
async function getSupportedNetworkCount(): Promise<number> {
    const contract = await initProfileContract();

    try {
        let count = await contract.getSupportedNetworkListLength();
        count = count.toNumber();
        if (count === 0) {
            throw(ErrorHandler(4390));
        }
        return count
    } catch(err) {
        console.log(err);
        throw(err)
    }
}

interface ISupportedExternalNetwork {
    networkType: string,
    networkID: number,
}

/**
 * get supported external network by ID
 * the ID should be acquired from @function getSupportedNetworkCount
 * @param id external network id
 * @returns 
 */
export async function getSupportedExternalNetwork(id: number): Promise<ISupportedExternalNetwork> {
    
    try {
        const contract = await initProfileContract();
        let supportedNetwork: any = await contract.supportedExternalNetworks(id);
        return {
            ...supportedNetwork,
            networkID: supportedNetwork.networkID.toNumber()
        };
    } catch(err: any) {
        throw(err)
    }
}

export async function getSupportedExternalNetworkList(): Promise<string[]> {
    try {
        let count = await getSupportedNetworkCount();
        const contract = await initProfileContract();
        let network: string[] = await contract.getSupportedNetworks(0, count);
        console.log('network', network)
        return network;

    } catch(err) {
        console.log(err)
    }
}

async function addExternalAddressTransaction(
    address: string,
    networkID: number,
) {
    const contract = await initProfileContract();
    try {
        const txn: ContractTransaction = await contract.addExternalAddressToProfile(networkID, address);
        return txn;

    } catch(err) {
        throw({err})
    }
}

export async function addExternalAddressToProfile(
    address: string,
    network: AddAddressNetwork,
) {
    let networkList: string[];

    try {
        networkList = await getSupportedExternalNetworkList()

    } catch(err) {
        console.log(err)
    }
    let networkID: number = networkList.findIndex((n) => n.toLowerCase() == network)
    try {
        const txn = await addExternalAddressTransaction(address, networkID)
        return txn;
    } catch(err) {
        console.log(err)
    }
    

}

export async function addAddressERC(
    address: string,
    network: AddAddressNetwork,
) {
    let isManager = true;
    let txn;

    if (network == 'erc') {
        txn = await addAddressToProfile(address, isManager);
    } else if (network == 'solana') {
        txn = await addExternalAddressToProfile(address, network);
    }

    return txn;
}

export async function addProfileMapping(profileID : number) {
    const contract = await initProfileContract();
    try {
        const txn: ContractTransaction = await contract.addProfileMapping(profileID);
        return txn;

    } catch(err) {
        throw({err})
    }
}

async function getAddressNumberfromProfile(profileID: number): Promise<number> {
    try {
        const contract = await initProfileContract();
        const resp = await contract.getAddressNumberfromProfile(profileID);
        return resp.toNumber();
    } catch(err) {
        console.log(err);
        throw({err})
    }
};

async function profileAddressMapping(profileID: number, mappingID: number): Promise<string> {
    try {
        const contract = await initProfileContract();
        const address = await contract.profileAddressMapping(profileID, mappingID);
        return address;
    } catch(err) {
        console.log(err);
        throw({err})
    }
}

export async function getMappedAddresses(profileID : number): Promise<string[]> {
    const addressNumber = await getAddressNumberfromProfile(profileID);
    const promises: any = []
    for (let n: number = 0; n < addressNumber; n++) {
        promises.push(new Promise(async (resolve, reject) => {
            try {
                const a = await profileAddressMapping(profileID, n);
                resolve(a)
            } catch(err) {
                reject(err)
            }
        }))
    }
    return await Promise.all(promises);
}