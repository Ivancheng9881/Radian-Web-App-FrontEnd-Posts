import ERCUtils from "../../../context/erc.utils";
import { abi } from './abi.json';
import { gasStationNetworkUrl, subgraphUrl } from '../../../../../commons/web3';
import { fetchDataFromSubgraph } from "../../../subgraph/subgraph.utils"; 


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

async function getProfilesFromSubgraph(skip, limit) {
    let query = `query Profile($skip: Int!, $limit: Int!) {
                profiles(skip: $skip, first: $limit) {
                    profileID
                    identityID
                    verifyID
                }
            }`;
    let params = {skip: skip, limit: limit};
    let result = await fetchDataFromSubgraph(subgraphUrl, query, params);
    console.log(result.data.profiles);
    return result.data.profiles;
}

async function getProfileListCountFromSubgraph() {
    // TODO set up a graph for metadata, reduce data fetched from api
    let query = `query { profiles {id} }`;
    const result = await fetchDataFromSubgraph(subgraphUrl, query);
    let count = result.data.profiles.length;
    return count
}

export async function getProfileFromIDSubgraph(pid) {
    
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

async function getProfileFromAddressSubgraph(address) {
    
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

async function getProfileFromID(id) {
    let contract = await initProfileContract(true);
    return await contract.getProfilefromID(id);
}

export async function getProfileListCountErc() {
    let count;
    if ( subgraphEnabled ) { // if subgraph is available, else directly query the smart contract
        count = await getProfileListCountFromSubgraph();
    } else {
        let contract = await initProfileContract(true);
        count = await contract.getProfilesCount();
    }
    return count
}

export async function getProfileListErc(skip, limit) {
    
    let profileList = [];

    if ( subgraphEnabled ){ // run if subgraph is available
        let profiles = await getProfilesFromSubgraph(skip, limit);
        profiles.map((p) => {
            p['network'] = "ERC";
            profileList.push(p);
        })
    } else { // directly read from contract
 
        let arr = [];
        for (let i = skip + 1; i < limit + skip + 1; i++) {
            arr.push(i);
        }

        let profiles = await Promise.all(
            arr.map(async (id) => { return await getProfileFromID(id) })
        )
            .then(resp => resp)
            .catch(err => console.log('Error in getting profile list', err))

        profiles.map((p) => {
            if (!profileList.includes(p[0])) {
                p['network'] = "ERC";
                profileList.push(p)
            }
        })

        console.log('updated profileList:', profileList)
    }

    return profileList
};


export async function getProfileErc(address = undefined) {
        console.log("Calling Get Profile ERC");
    try {
        if (!address) {
            address = await ERCUtils.getAddress();
        }
        console.log('getProfileErc Address:',address);
        if ( subgraphEnabled && false ) return getProfileFromAddressSubgraph(address);

        let contract = await initProfileContract();
        if ((await contract.addressProfileMapping(address)).toNumber() > 0) {
            let _profile = await contract.getProfilefromAddressV2(address);
            return {
                ..._profile[1],
                profileID: _profile[0].toString()
            };
        }

    } catch (err) {
        console.log('Error in getProfileErc', err)
        return { identityID: null }
    }
}

// write requests
export async function createProfileErc(identityID, useGasStation) {
    console.log('createProfileErc', identityID, useGasStation)

    let currentProfile = await getProfileErc();
    console.log("Current Profile", currentProfile);
    console.log("from address", await ERCUtils.getAddress());
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

export async function hasPersonalProfileErc (walletAddress) {
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