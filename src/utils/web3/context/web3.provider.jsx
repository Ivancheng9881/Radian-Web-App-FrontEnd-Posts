import { useEffect, useState , useContext} from "react";
import Web3Context from "./web3.context"
import ERCUtils from "./erc.utils";
// import SolanaWalletProvider from "./solanaWallet.provider";
// import { getProfileErc } from '../contract/profileContract/erc';
import CreateSnackbarContext from '../../../page/start/context/snackbar/snackbar.context';

const Web3Provider = ({ children }) => {
    const windowNetworkVersion = window.ethereum?.networkVersion
    const SnackbarContext = useContext(CreateSnackbarContext);
    const { setSnackBar } = SnackbarContext;
    const [ provider, setProvider ] = useState({'phantom@solana': null, 'metamask@erc': null, 'selected': 'metamask@erc'});
    const [ networkId, setNetworkId ] = useState(undefined)

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

            window.ethereum.request({ method: 'eth_accounts' }).then((result)=> {
                if (result.length != 0) {     
                    connectERCProvider();
                }
            });

            window.ethereum.on("chainChanged", async (_chainId) => {
                if (!_chainId.includes('0x89')) {
                    setSnackBar({ open: true, message: `Invalid network, polygon mainnet required`, severity: 'danger' })
                    
                    //Request for switching network if not on the Polygon mainnet
                    setTimeout(async () => {
                        await ERCUtils.switchNetwork('0x89')
                        console.log('UPDATED NETWORK TO 137')
                    }, 1000)
                }
            });

            window.ethereum.on('accountsChanged', (acc) => {
                console.log('listening to accountsChanged event', acc)
                if (acc.length == 0) {
                    setProvider((prevState) => ({'metamask@erc': null, 'phantom@solana': prevState['phantom@solana'], 'selected': prevState['phantom@solana']? 'phantom@solana' : null}));
                }
            });

            return () => window.ethereum.removeAllListeners();
    }, [])

    // TODO later extend to more supported networks
    useEffect(() => {
        //Check current network globally
        window.ethereum.request({ method: 'eth_accounts' }).then((result)=> {
            if (result.length != 0) {     
                getCurrentChainId();
                if(window.ethereum.networkVersion !== null && Number(window.ethereum.networkVersion) !== 137 && networkId !== 137){
                    setSnackBar({ open: true, message: `Invalid network, polygon mainnet required`, severity: 'danger' })
                    setTimeout( async () => {
                        await ERCUtils.switchNetwork('0x89')
                        console.log('UPDATED NETWORK TO 137')
                    }, 1000)
                }
            }
        });

    }, [windowNetworkVersion, networkId]);

    const getCurrentChainId = async () => {
        const chainInfo = await ERCUtils.getChainId();
        if (!chainInfo) return; // do not update chainID if metamask is not connected
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
                setProvider((prevState) => ({'selected': 'phantom@solana', 'phantom@solana': resp.publicKey, 'metamask@erc': prevState['metamask@erc']}));
                return resp.publicKey
            }
        }
    }

    const connectERCProvider = async () => {
        if (window.ethereum !== undefined && window.ethereum?.isMetaMask) {
            let isConnected = await ERCUtils.connectWallet();
            if (isConnected.length > 0) {
                console.log("setting provider to:");
                console.log(isConnected[0]);
                setProvider((prevState) => ({'selected': 'metamask@erc', 'metamask@erc': isConnected[0], 'phantom@solana': prevState['phantom@solana']}));
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
        network: networkId
    };
 
    return (
        <Web3Context.Provider value={providerValue}>
            {children}
        </Web3Context.Provider>
    )
};

export default Web3Provider;