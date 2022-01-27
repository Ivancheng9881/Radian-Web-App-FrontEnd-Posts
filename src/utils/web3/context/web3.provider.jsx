import { useEffect, useState , useContext} from "react";
import Web3Context from "./web3.context"
import ERCUtils from "./erc.utils";
// import SolanaWalletProvider from "./solanaWallet.provider";
// import { getProfileErc } from '../contract/profileContract/erc';
import CreateSnackbarContext from '../../../page/start/context/snackbar/snackbar.context';

const Web3Provider = ({ children }) => {
    const SnackbarContext = useContext(CreateSnackbarContext);
    const { setSnackBar } = SnackbarContext;
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
            //Listening to chainId changes
            window.ethereum.on("chainChanged", async (_chainId) => {
                if (!_chainId.includes('0x89')) {
                    setSnackBar({ open: true, message: `Invalid network, polygon mainnet required`, severity: 'danger' })
                    
                    //Request for switching network if not on the Polygon mainnet
                    setTimeout(async () => {
                    await ERCUtils.switchNetwork('0x89')
                    console.log('UPDATED NETWORK TO 137')
                    }, 1000)
                }
            })
        
            window.ethereum.on('accountsChanged', (acc) => {
            console.log('listening to accountsChanged event', acc)
            })
            return () => window.ethereum.removeAllListeners();
    }, [])

    useEffect(() => {
        //Show wallet detail on refresh
        connectERCProvider()
    }, [])

    useEffect(() => {
        //Check current network globally
        getCurrentChainId()
        if(window.ethereum.networkVersion !== null && Number(window.ethereum.networkVersion) !== 137 && networkId !== 137){
            setSnackBar({ open: true, message: `Invalid network, polygon mainnet required`, severity: 'danger' })
            setTimeout( async () => {
                await ERCUtils.switchNetwork('0x89')
                console.log('UPDATED NETWORK TO 137')
            }, 1000)
        }
    }, [window.ethereum.networkVersion, networkId])

    const getCurrentChainId = async () => {
        const chainInfo = await ERCUtils.getChainId();
        const { name, chainId } = chainInfo;
        console.log('Web3Provider', { name, chainId })
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
        wallet: wallet
    };
 
    return (
        <Web3Context.Provider value={providerValue}>
            {children}
        </Web3Context.Provider>
    )
};

export default Web3Provider;