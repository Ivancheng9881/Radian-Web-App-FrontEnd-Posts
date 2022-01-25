import { useEffect, useState } from "react";
import Web3Context from "./web3.context"
import ERCUtils from "./erc.utils";
// import SolanaWalletProvider from "./solanaWallet.provider";

const Web3Provider = ({ children }) => {
    const [ provider, setProvider ] = useState('phantom@solana');
    const [ networkId, setNetworkId ] = useState(undefined)
    const [ wallet, setWallet] = useState(null);

    // useEffect(() => {
    //     // handle solana wallet eager connection
    //     if (window.solana?.isPhantom) {
    //         window.solana.connect({onlyIfTrusted: true })
    //             .then(({publicKey}) => {
    //                 setProvider('phantom@solana');
    //                 setWallet(publicKey);
    //             })
    //             .catch((err) => {
    //                 console.error(err);
    //             } )
    //     }
    // }, [])


    useEffect(() => {
        window.ethereum.on("chainChanged", async (_chainId) => {
            console.log('listening to chainChanged event', _chainId);
            setNetworkId(_chainId)
        })
        return () => {
            window.ethereum.removeAllListeners();
        }
    }, [])

    useEffect(() => {
        //Show wallet detail on refresh
        connectERCProvider()
    }, [])

    useEffect(() => {
        getCurrentChainId()
    }, [])

    const getCurrentChainId = async () => {
        const chainInfo = await ERCUtils.getChainId();
        const { name, chainId } = chainInfo;
        console.log('Web3 Provider', { name, chainId })
        setNetworkId(chainId)
    }

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
        network: networkId,
        wallet: wallet,
    };

    //TODO: check network for both 
    // useEffect(() => {
    //     window.solana?.on('connect', handleConnectEvent)
    // }, []);

    //TODO: check metamask is installed
    // useEffect(() => {
    // }, []);
    
    return (
        <Web3Context.Provider value={providerValue}>
            {children}
        </Web3Context.Provider>
    )
};

export default Web3Provider;