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

async function getProfileFromAddressSubgraph(address) {
    
    let query = `query Addresses($address: String!) {
            addresses(first: 5, where: {address: $address}) {
            profile {
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
            profileList.push(p.identityID);
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
                profileList.push(p[0])
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
        console.log('getProfileErc Address:',address)
        let profileFromAddress;
        if ( subgraphEnabled ) {
            profileFromAddress = await getProfileFromAddressSubgraph(address);
        } else {
            let contract = await initProfileContract();
            if ((await contract.addressProfileMapping(address)).toNumber() > 0) {
                profileFromAddress = await contract.getProfilefromAddress(address);
                console.log('get profile result:');
            }
        }
        return profileFromAddress

    } catch (err) {
        console.log('Error in getProfileErc', err)
        return { identityID: null }
    }
}

// write requests
export async function createProfileErc(identityId, useGasStation) {
    console.log('createProfileErc', identityId, useGasStation)

    let currentProfile = await getProfileErc();
    console.log("Current Profile", currentProfile);
    console.log("from address", await ERCUtils.getAddress());
    let contract = useGasStation ? await initGaslessProfileContract() : await initProfileContract();
    let txn;
    if (currentProfile) {
        // perform update
        txn = await contract.updateProfile(identityId)
    } else {
        txn = await contract.createProfile(identityId)
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
        console.log('getPersonalProfile()', walletAddress, profileResp);
        if (profileResp != undefined) {
            return true;
        }
    }
    return false;
};