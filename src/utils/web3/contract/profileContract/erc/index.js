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
    let contract = await initProfileContract(true);
    let count = await contract.getProfilesCount();
    console.log(count)
    return count
}

export async function getProfileListErc(skip, limit) {
    let arr = [];
    for (let i = skip + 1; i < limit + skip + 1; i++) {
        arr.push(i);
    }

    let profiles = await Promise.all(
        arr.map(async (id) => { return await getProfileFromID(id) })
    )
        .then(resp => resp)
        .catch(err => console.log('Error in getting profile list', err))

    let profileList = [];
    profiles.map((p) => {
        if (!profileList.includes(p[0])) {
            profileList.push(p[0])
        }
    })
    console.log('updated profileList:', profileList)

    return profileList
};

export async function getProfileErc(address = undefined) {
    
    // let query1 = `query {
    //             profiles(skip: 0, first: 2) {
    //                 id
    //                 profileID
    //                 identityID
    //                 verifyID
    //                 addresses {
    //                     address
    //                 }
    //                 externalAddresses {
    //                     externalAddress
    //                 }
    //             }
    //         }`;

    // let query2 = `query {
    //                 addresses(first: 5, where: {address: "0xf20C214c69D0f0aFF77E63B56833BF68da635cb2"}) {
    //                 id
    //                 address
    //                 profile {
    //                     id
    //                 }
    //             }
    //         }`;

    // const fetchSubgraph = createApolloFetch({
    //     uri: 'https://api.thegraph.com/subgraphs/name/radian-dev/radian-profile-subgraph',
    //   })

    // let result = await fetchSubgraph({query: query2});
    // console.log("The Graph");
    // console.log(query2);
    // console.log(result);
    
    try {
        let contract = await initProfileContract();
        if (!address) {
            address = await ERCUtils.getAddress();
        }
        console.log('getProfileErc Address:',address)
        if ((await contract.addressProfileMapping(address)).toNumber() > 0) {
            const profileFromAddress = await contract.getProfilefromAddress(address)
            console.log('get profile result:',profileFromAddress)
            return profileFromAddress;
        }
        return undefined;
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