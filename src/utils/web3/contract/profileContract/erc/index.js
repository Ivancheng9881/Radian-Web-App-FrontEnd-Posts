import ERCUtils from "../../../context/erc.utils";
import { abi } from './abi.json';


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
        relayLookupWindowBlocks: 500,
        relayRegistrationLookupBlocks: 500,
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
        txn = await contract.updateProfileEVM(identityId)
    } else {
        txn = await contract.createProfileEVM(identityId)
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