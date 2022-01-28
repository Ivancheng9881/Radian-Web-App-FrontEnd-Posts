import ERCUtils from "../../../context/erc.utils";
import { abi } from './abi.json';
const { createApolloFetch } = require('apollo-fetch')

export const profileContract__evm__abi = abi;

export const profileContract__evm__address = '0x1EFC4aBA053A793933df06f16B11a69bbAAdB38F';
const paymasterAddress = "0xDeB767A9F567FfC6cbcCB8E48940b4ADB7A2aD88";

async function initProfileContract(readOnly=false) {
    return await ERCUtils.initContract(
        profileContract__evm__address,
        profileContract__evm__abi,
        readOnly
    );
}

async function initGaslessProfileContract() {
    const config = {
        preferredRelays: ["https://relay.server.polygon.radian.community/gsn1"],
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

    const fetchSubgraph = createApolloFetch({
        uri: 'https://api.thegraph.com/subgraphs/name/radian-dev/radian-profile-subgraph',
    })

    let result = await fetchSubgraph({query: query, variables: {skip: skip, limit: limit}});
    console.log(result.data.profiles);
    return result.data.profiles;
}

async function getProfileFromID(id) {
    let contract = await initProfileContract(true);
    // console.log('getProfileFromID', contract)
    return await contract.getProfilefromID(id);
}

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

export async function getProfileListCountErc() {
    // let contract = await initProfileContract(true);
    // let count = await contract.getProfilesCount();

    // TODO set up a graph for metadata, reduce data fetched from api
    let query = `query {
        profiles {
            id
        }
    }`;
    const fetchSubgraph = createApolloFetch({
        uri: 'https://api.thegraph.com/subgraphs/name/radian-dev/radian-profile-subgraph',
    })
    console.log("sending request");
    let result = await fetchSubgraph({query: query});
    let count = result.data.profiles.length;
    return count
}

export async function getProfileListErc(skip, limit) {
    
    // let arr = [];
    // for (let i = skip + 1; i < limit + skip + 1; i++) {
    //     arr.push(i);
    // }

    // let profiles = await Promise.all(
    //     arr.map(async (id) => { return await getProfileFromID(id) })
    // )
    //     .then(resp => resp)
    //     .catch(err => console.log('Error in getting profile list', err))

    // let profileList = [];
    // profiles.map((p) => {
    //     if (!profileList.includes(p[0])) {
    //         profileList.push(p[0])
    //     }
    // })
    // console.log('updated profileList:', profileList)

    let profiles = await getProfilesFromSubgraph(skip, limit);
    let profileList = [];
    profiles.map((p) => {
        profileList.push(p.identityID);
    })

    return profileList
};

async function getProfileFromAddressSubgraph(address) {
    
    let query = `query Addresses($address: String!) {
            addresses(first: 5, where: {address: $address}) {
            profile {
                identityID
                verifyID
            }
        }
    }`;

    const fetchSubgraph = createApolloFetch({
        uri: 'https://api.thegraph.com/subgraphs/name/radian-dev/radian-profile-subgraph',
    })

    let result = await fetchSubgraph({query: query, variables: {address: address}});
    console.log(result.data.addresses[0].profile.identityID);
    let profile = result.data.addresses[0].profile;

    return profile;
}

export async function getProfileErc(address = undefined) {
        
    try {
        if (!address) {
            address = await ERCUtils.getAddress();
        }
        console.log('getProfileErc Address:',address)

        // let contract = await initProfileContract();
        // if ((await contract.addressProfileMapping(address)).toNumber() > 0) {
        //     const profileFromAddress = await contract.getProfilefromAddress(address)
        //     console.log('get profile result:',profileFromAddress)
        //     return profileFromAddress;
        // }
        // return undefined;
        
        let profileFromAddress = await getProfileFromAddressSubgraph(address);
        console.log(profileFromAddress.identityID);
        return profileFromAddress

    } catch (err) {
        console.log('Error in getProfileErc', err)
        return { identityID: null }
    }
}

export async function getPersonalProfile () {
    let walletAddress = await ERCUtils.getAddress();
    if (walletAddress) {
        let profileResp = await getProfileErc(walletAddress);
        console.log('getPersonalProfile()', walletAddress, profileResp)
        return profileResp;
    }
};