import { ethers } from "ethers";
import Web3 from "web3";
const { RelayProvider } = require('@opengsn/provider');

async function initEtherProvider() {
    let resp = await connectWallet();
    if (!resp) return false; 
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
    if (!provider) return false
    return await provider.getSigner()
};

async function getAddress() {
    let signer = await getSigner();
    if (!signer) return false
    return await signer.getAddress();
}


/**
 * method to connect metamask
 * @returns {[string]} array of wallet address
 */
async function connectWallet() {
    try {
        let resp = await window.ethereum.request({method: 'eth_requestAccounts', params: [ { eth_accounts: {} }]})
        return resp;
    } catch (err) {
        return false
    }
}

function isConnected() {
    return window.ethereum.isConnected()
}


async function initContract(address, abi) {
    let signer = await getSigner()
    const contract = new ethers.Contract(address, abi, signer);
    return contract;
}

async function initContractGasless(address, abi, config) {
    let provider = await initEtherProvider();
    // console.log(provider);
    // console.log(window.ethereum);
    provider = await RelayProvider.newProvider({ provider: window.ethereum, config }).init();
    const provider2 = new ethers.providers.Web3Provider(provider);
    const signer = provider2.getSigner();
    const contract = new ethers.Contract(address, abi, signer);
    return contract;
}

const ERCUtils = {
    getSigner,
    getAddress,
    connectWallet,
    initContract,
    initContractGasless,
    isConnected,
}

export default ERCUtils;