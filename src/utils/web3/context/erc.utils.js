import { ethers } from "ethers";
import Web3 from "web3";

async function initEtherProvider() {
    return new ethers.providers.Web3Provider(window.ethereum);
}

function ercErrorHandler(code) {
    switch(code) {
        case 4001:
            return { }

    }
}

async function getSigner() {
    let provider = await initEtherProvider();
    return await provider.getSigner()
};

async function getAddress() {
    let signer = await getSigner();
    return await signer.getAddress();
}


/**
 * method to connect metamask
 * @returns {[string]} array of wallet address
 */
async function connectWallet() {
    try {
        let resp = await window.ethereum.request({method: 'eth_requestAccounts'})
        return resp;
    } catch (err) {
        return false
    }
}


async function initContract(address, abi) {
    let signer = await getSigner()
    const contract = new ethers.Contract(address, abi, signer);
    return contract;
}

const ERCUtils = {
    getSigner,
    getAddress,
    connectWallet,
    initContract,
}

export default ERCUtils;