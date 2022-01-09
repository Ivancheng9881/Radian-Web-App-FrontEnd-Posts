import ERCUtils from "../../../context/erc.utils";
import {abi} from './abi.json';


export const profileContract__evm__abi = abi;

export const profileContract__evm__address = '0x56560Ea78EC27771C9E3d5380827544DD95e39B2';

async function initProfileCOntract() {
    return await await ERCUtils.initContract(
        profileContract__evm__address,
        profileContract__evm__abi,
    );
}

export async function createProfileErc(identityId) {
    let currentProfile =  await getProfileErc();
    let contract = await initProfileCOntract();
    let txn;
    if (currentProfile) {
        // perform update
        txn = await contract.updateProfileEVM(identityId)
    } else {
        txn = await contract.createProfileEVM(identityId)
    }
    return txn
}

export async function getProfileErc() {
    let contract = await initProfileCOntract();
    let signerAddress = await ERCUtils.getAddress();
    let profileId = await contract.getProfilefromAddress(signerAddress);
    return profileId
}
