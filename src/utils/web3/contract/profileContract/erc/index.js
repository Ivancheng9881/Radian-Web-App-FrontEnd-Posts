import ERCUtils from "../../../context/erc.utils";
import { abi } from './abi.json';


export const profileContract__evm__abi = abi;

export const profileContract__evm__address = '0x6c853aA1830591Db08eC31510227C0521935e55D';

async function initProfileContract() {
    return await await ERCUtils.initContract(
        profileContract__evm__address,
        profileContract__evm__abi,
    );
}

async function getProfileFromID(id) {
    let contract = await initProfileContract();
    return await contract.getProfilefromID(id);
}

export async function createProfileErc(identityId) {
    let currentProfile = await getProfileErc();
    console.log("Current Profile");
    console.log(currentProfile);
    let contract = await initProfileContract();
    let txn;
    if (currentProfile.identityID) {
        // perform update
        txn = await contract.updateProfileEVM(identityId)
    } else {
        txn = await contract.createProfileEVM(identityId)
    }
    return txn
};

export async function getProfileListCountErc() {
    let contract = await initProfileContract();
    let count = await contract.getProfilesCount();
    console.log('getProfileListCountErc', count)
    return count
}

export async function getProfileListErc(skip, limit) {
    let arr = [1, 2, 3, 4]

    let profiles = await Promise.all(
        arr.map(async (id) => { return await getProfileFromID(id) })
    )
        .then(resp => resp)
        .catch(err => console.log(err))

    console.log('getProfileListErc...', profiles)

    let profileList = [];
    profiles.map((p) => {
        if (!profileList.includes(p[0])) {
            profileList.push(p[0])
        }
    })

    console.log('profileList...', profileList)

    return profileList
};

export async function getProfileErc(address = undefined) {
    try {
        let contract = await initProfileContract();
        if (!address) {
            address = await ERCUtils.getAddress();
        }
        let profileId = await contract.getProfilefromAddress(address);
        return profileId
    } catch (err) {
        console.log('Error in getProfileErc', err)
        return { identityID: null }
    }
}
