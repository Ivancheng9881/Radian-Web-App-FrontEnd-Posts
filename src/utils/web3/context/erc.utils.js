import React from 'react';
import { ethers } from "ethers";
// import Web3 from "web3";
// import { maticHttpProvider } from "../../../commons/web3";\
const { RelayProvider } = require('@opengsn/provider');

async function initEtherProvider() {
    console.log("init provider");
    let resp = await connectWallet();
    if (!resp) return false;
    return new ethers.providers.Web3Provider(window.ethereum, "any");
}

function ercErrorHandler(code) {
    switch (code) {
        case 4001:
            return {}

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

async function getChainId() {
    console.log("Get chain ID");
    const eth = await initEtherProvider();
    if (!eth) return null;
    let currentNetworkId = await eth.getNetwork();
    // console.log('ERC_CHAINID_UTILS', currentNetworkId)
    return currentNetworkId;
}

async function switchNetwork(chainId) {
    try {
        const data = [{ chainId: chainId }]// '0x89'
        const switchedNetwork = await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: data,
        });
        console.log('Switched network status', switchedNetwork)
        return switchedNetwork;
    } catch (switchError) {
        console.log('Error in switching polygon', switchError)
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
            // const param = networkMapping[Number(chainId)].param;
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: '0x89',
                        chainName: 'Polygon Mainnet',
                        nativeCurrency: {
                            name: 'matic',
                            symbol: 'MATIC',
                            decimals: 18
                        },
                        rpcUrls: ['https://polygon-rpc.com/'],
                        blockExplorerUrls: ['https://polygonscan.com/'],
                        meta: {
                            svg: () => <React.Fragment><path d="M197.648 68.5918C192.815 65.7437 186.533 65.7437 181.218 68.5918L143.524 90.4273L117.912 104.668L80.219 126.503C75.3865 129.351 69.1043 129.351 63.7886 126.503L33.8273 109.414C28.9948 106.566 25.6121 101.345 25.6121 95.6488V61.9462C25.6121 56.25 28.5116 51.0285 33.8273 48.1804L63.3053 31.5665C68.1378 28.7184 74.42 28.7184 79.7357 31.5665L109.214 48.1804C114.046 51.0285 117.429 56.25 117.429 61.9462V83.7817L143.041 69.0665V47.2311C143.041 41.5348 140.142 36.3133 134.826 33.4652L80.219 2.13608C75.3865 -0.712026 69.1043 -0.712026 63.7886 2.13608L8.2152 33.4652C2.89948 36.3133 0 41.5348 0 47.2311V110.364C0 116.06 2.89948 121.282 8.2152 124.13L63.7886 155.459C68.621 158.307 74.9033 158.307 80.219 155.459L117.912 134.098L143.524 119.383L181.218 98.0222C186.05 95.1741 192.332 95.1741 197.648 98.0222L227.126 114.636C231.958 117.484 235.341 122.706 235.341 128.402V162.104C235.341 167.801 232.442 173.022 227.126 175.87L197.648 192.959C192.815 195.807 186.533 195.807 181.218 192.959L151.74 176.345C146.907 173.497 143.524 168.275 143.524 162.579V140.744L117.912 155.459V177.294C117.912 182.99 120.812 188.212 126.127 191.06L181.701 222.389C186.533 225.237 192.815 225.237 198.131 222.389L253.705 191.06C258.537 188.212 261.92 182.99 261.92 177.294V114.161C261.92 108.465 259.02 103.244 253.705 100.396L197.648 68.5918Z" fill="#8247E5"></path></React.Fragment>,
                            name: `Polygon`
                        }
                    }]
                })
            } catch (err) {
                console.log('Error in adding ethereum chain', err)
            }
        }
    }
};

/**
 * method to connect metamask
 * @returns {[string]} array of wallet address
 */
async function connectWallet() {
    console.log("connecting wallet");
    try {
        if (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined') {
            let resp = await window.ethereum.request({ method: 'eth_requestAccounts', params: [{ eth_accounts: {} }] })
            return resp;
        }
    } catch (err) {
        console.log('Error in connecting wallet', err.message);
        return false
    }
}

function isConnected() {
    return window.ethereum.isConnected()
}


async function initContract(address, abi, readOnly = false) {
    let signer = await getSigner();
    // signer = ethers.getDefaultProvider(maticHttpProvider)
    // console.log('initContract signer', signer);
    const contract = new ethers.Contract(address, abi, signer);
    return contract;
}

async function initContractGasless(address, abi, config) {
    let provider = await initEtherProvider();
    provider = await RelayProvider.newProvider({ provider: window.ethereum, config }).init();
    const provider2 = new ethers.providers.Web3Provider(provider, "any");
    const signer = provider2.getSigner();
    const contract = new ethers.Contract(address, abi, signer);
    return contract;
}

const ERCUtils = {
    getSigner,
    getAddress,
    getChainId,
    switchNetwork,
    connectWallet,
    initContract,
    initContractGasless,
    isConnected,
}

export default ERCUtils;