import ERCUtils from "../../../context/erc.utils";
import { abi } from './abi.json';
import { gasStationNetworkUrl, subgraphUrl } from '../../../../../commons/web3';
import { fetchDataFromSubgraph } from "../../../subgraph/subgraph.utils"; 
import { FixLater } from "../../../../../schema/helper.interface";
import { ERCProfile } from "./index.interface";
import { ContractTransaction, Transaction } from "ethers";
import { TransactionTypes } from "ethers/lib/utils";
import ErrorHandler from "../../../../errorHandler";


export const profileContract__evm__abi = abi;
export const profileContract__evm__address = '0x1EFC4aBA053A793933df06f16B11a69bbAAdB38F';
const paymasterAddress = "0xDeB767A9F567FfC6cbcCB8E48940b4ADB7A2aD88";
const subgraphEnabled = true;

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
    let query = `query Profile($skip: Int!, $limit: Int!) {
                profiles(skip: $skip, first: $limit) {
                    profileID
                    identityID
                    verifyID
                }
            }`;
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
    
    let query = `query Profile($profileID: BigInt!) {
                profiles(first: 1, where: {profileID: $profileID}) {
                    identityID
                    addresses {
                        address
                    }
                    externalAddresses {
                        externalAddress
                    }
            }
        }`;
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
    
    let query = `query Addresses($address: String!) {
            addresses(first: 5, where: {address: $address}) {
            profile {
                profileID
                identityID
                verifyID
            }
        }
    }`;
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

async function getProfileFromID(id: number) {
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
        throw(err)
    }
}

// write requests
export async function createProfileErc(
    identityID: string, 
    useGasStation: boolean
    ) {

    let currentProfile = await getProfileErc();
    let contract = useGasStation ? await initGaslessProfileContract() : await initProfileContract();
    let txn;
    if (currentProfile) {
        // perform update
        txn = await contract.updateProfile(identityID)
    } else {
        txn = await contract.createProfile(identityID)
    }
    return txn
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

export async function addExternalAddressToProfile(
    address: string,
    network: AddAddressNetwork,
) {
    const contract = await initProfileContract();
    try {
        const supportedNetwork = await contract.supportedExternalNetworks(0);
        console.log(supportedNetwork)
    
    } catch(err) {
        console.log(err);
    }
    // try {
    //     const txn: ContractTransaction = await contract.addExternalAddressToProfile(address, isManager);
    //     return txn;

    // } catch(err) {
    //     throw({err})
    // }
}

export async function addAddressERC(
    address: string,
    network: AddAddressNetwork,
) {
    let isManager = true;
    console.log(network)
    if (network == 'erc') {
        let txn = await addAddressToProfile(address, isManager);
    } else if (network == 'solana') {
        let txn = await addExternalAddressToProfile(address, network);

    }
    
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