import { useEffect, useState } from "react";

import Web3Context from "./web3.context"
import ERCUtils from "./erc.utils";
import ipfsUtils from "../ipfs/ipfs.utils";


const Web3Provider = ({children}) => {

    const [ provider, setProvider ] = useState(null);
    const [ wallet, setWallet ] = useState(null);

    useEffect(() => {
        // handle solana wallet eager connection
        if (window.solana?.isPhantom) {
            window.solana.connect({onlyIfTrusted: true })
                .then(({publicKey}) => {
                    setProvider('phantom@solana');
                    setWallet(publicKey);
                })
                .catch((err) => {
                    console.error(err);
                } )
        }
    }, [])

    const handleConnectEvent = () => {
        console.log('connected')
    }

    const connectSolanaProvider = async () => {
        if (window.solana?.isPhantom) {
            const resp = await window.solana.connect();
            if (resp) {
                setProvider('phantom@solana');
                setWallet(resp.publicKey);
                return resp.publicKey
            }
        }   
    }

    const connectERCProvider = async () => {
        if (window.ethereum?.isMetaMask) {
            let isConnected = await ERCUtils.connectWallet();
            if (isConnected.length > 0) {
                setProvider('metamask@erc');
                setWallet(isConnected[0]);
            }
            return isConnected
        } 
    }

    const connectProvider = async (network) => {
        if (network === 'solana') {
            return await connectSolanaProvider();
        } else if (network === 'erc') {
            return await connectERCProvider();
        }
    };

    const providerValue = {
        connect: connectProvider,
        provider: provider,
        wallet: wallet,
    };


    useEffect(() => {
        window.solana?.on('connect', handleConnectEvent)
    }, []);


    useEffect(() => {

    }, [])

    return (
        <Web3Context.Provider value={providerValue}>
            {children}
        </Web3Context.Provider>
    )
};

export default Web3Provider;