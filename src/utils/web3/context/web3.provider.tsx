import { useEffect, useState , useContext, FC} from "react";
import Web3Context from "./web3.context"
import ERCUtils from "./erc.utils";
// import SolanaWalletProvider from "./solanaWallet.provider";
import CreateSnackbarContext from '../../../page/start/context/snackbar/snackbar.context';
import { FixLater } from "../../../schema/helper.interface";
import { WalletProvider } from "./web3.interface";



const Web3Provider : FC = ({ children }) => {

    const metamaskObjKey = 'metamask@erc';
    const phantomObjKey = 'phantom@solana';

    const SnackbarContext = useContext(CreateSnackbarContext);
    const { setSnackBar } = SnackbarContext;
    const [ providers, setProviders ] = useState<WalletProvider>({
        'phantom@solana': null, 
        'metamask@erc': null, 
        selected: null
    });
    const [ networkId, setNetworkId ] = useState(undefined)

    useEffect(() => {
        autoConnectEthereum();
    }, [])

    // connect solana
    useEffect(() => {
        autoConnectSolana();
    }, [window.solana?.isPhantom])

    // register ethereum event listener
    useEffect(() => {

            window.ethereum?.on("chainChanged", async (_chainId: string) => {
                if (!_chainId.includes('0x89')) {
                    setSnackBar({ open: true, message: `Invalid network, polygon mainnet required`, severity: 'danger' })
                    
                    //Request for switching network if not on the Polygon mainnet
                    setTimeout(async () => {
                        await ERCUtils.switchNetwork('0x89')
                        console.log('UPDATED NETWORK TO 137')
                    }, 1000)
                }
            });

            window.ethereum?.on('accountsChanged', (acc: string[]) => {
                // on accounts change, update the providers if no accounts exists for metamask (basically disconnected)
                // else, if there is >1 accounts connected in metamask, stay connected
                if (acc.length == 0) {
                    // get available providers
                    let providerLists: FixLater = [];
                    let existingProviders = Object.keys(providers);
                    for (let p = 0 ; p < existingProviders.length ; p++ ) {
                        if ( existingProviders[p] != 'metamask@erc' && providers[existingProviders[p]]) {
                            providerLists.push(existingProviders[p]);
                        }
                    }
                    if (providerLists.length == 0) {
                        providerLists.push(null);
                    }
                    setProviders((prevState) => {
                        console.log("ProviderList", providerLists);
                        const newProvider = prevState.selected == "metamask@erc" ? providerLists[0] : prevState.selected;
                        console.log("setting new provider to ", newProvider);
                        storeProviderDetails({'metamask@erc': null, 'phantom@solana': providers['phantom@solana'], selected: newProvider});
                        return {'metamask@erc': null, 'phantom@solana': prevState['phantom@solana'], selected: newProvider};
                    });

                } else {
                    if ( ! (providers['metamask@erc'] in acc) ) {                        
                        setProviders((prevState) => ({'metamask@erc': acc[0], 'phantom@solana': prevState['phantom@solana'], 'selected': prevState.selected}));
                        // storeProviderDetails({'metamask@erc': acc[0], 'phantom@solana': providers['phantom@solana'], selected: selectedProvider});
                    }
                }
                console.log(providers);
            });

            return () => window.ethereum?.removeAllListeners();
    }, [])

    // // TODO later extend to more supported networks
    // useEffect(() => {
    //     //Check current network globally
    //     window.ethereum.request({ method: 'eth_accounts' }).then((result)=> {
    //         if (result.length != 0) {     
    //             getCurrentChainId();
    //             if(window.ethereum.networkVersion !== null && Number(window.ethereum.networkVersion) !== 137 && networkId !== 137){
    //                 setSnackBar({ open: true, message: `Invalid network, polygon mainnet required`, severity: 'danger' })
    //                 setTimeout( async () => {
    //                     await ERCUtils.switchNetwork('0x89')
    //                     console.log('UPDATED NETWORK TO 137')
    //                 }, 1000)
    //             }
    //         }
    //     });

    // }, [windowNetworkVersion, networkId]);

    // const getCurrentChainId = async () => {
    //     const chainInfo = await ERCUtils.getChainId();
    //     if (!chainInfo) return; // do not update chainID if metamask is not connected
    //     const { name, chainId } = chainInfo;
    //     console.log('Web3Provider', { name, chainId })
    //     setNetworkId(chainId)
    // }

    const autoConnectSolana = async () => {
        if (!window.solana?.isPhantom) return;
        
        const prevProviders = loadProviderDetails();

        try {
            const result = await window.solana.connect({onlyIfTrusted: true });
            console.log(result)
            setProviders((prevState) => ({
                ...prevState,
                [phantomObjKey]: result.publicKey,
                selected: prevProviders && prevProviders.selected == 'phantom@solana' ? 'phantom@solana' : prevState.selected
            }))
        } catch(err: FixLater) {
            console.log(err);
        }
    };

    const autoConnectEthereum = async () => {

        const prevProviders = loadProviderDetails();

        // load past connection details, can try to resume connection in the defined order

        try {
            const result: string[] = await window.ethereum?.request({ method: 'eth_accounts' })
            if (result.length != 0) {
                connectERCProvider(true).then(
                    (addressList)=>{
                        console.log("Address list", addressList);
                        const connectingAddress: string = prevProviders && prevProviders["metamask@erc"] in addressList ? prevProviders["metamask@erc"] : addressList[0];
                        setProviders((prevState) => ({
                            ...prevState,
                            [metamaskObjKey]: connectingAddress, 
                            selected: prevProviders && prevProviders.selected == 'metamask@erc' ? 'metamask@erc' : prevState.selected
                        }));
                    }                        
                ); // handle connection here    
            }

        } catch (err: FixLater) {

        }
    }

    const connectSolanaProvider = async (resumeFrom : FixLater =null) => {
        console.log("Solana connecting");
        if (window.solana?.isPhantom) {
            const resp = await window.solana.connect();
            if (resp) {
                setProviders((prevState) => {
                    storeProviderDetails({'phantom@solana': resp.publicKey, 'metamask@erc': prevState['metamask@erc'], 'selected': 'phantom@solana'});                    
                    return {'phantom@solana': resp.publicKey, 'metamask@erc': prevState['metamask@erc'], 'selected': 'phantom@solana'}
                });
                // if (resumeFrom) {
                    // TODO check which wallet address to resume from                    
                // }
                return resp.publicKey
            }
        }
    }

    const connectERCProvider = async (init: boolean=false) => {
        if (window.ethereum !== undefined && window.ethereum?.isMetaMask) {
            let isConnected = await ERCUtils.connectWallet();
            if (isConnected.length > 0) {
                if (!init) {
                    setProviders((prevState) => {
                        storeProviderDetails({'metamask@erc': isConnected[0], 'phantom@solana': prevState['phantom@solana'], 'selected': 'metamask@erc'});
                        return {'metamask@erc': isConnected[0], 'phantom@solana': prevState['phantom@solana'], 'selected': 'metamask@erc'}
                    });
                }
            }
            return isConnected
        }
    }

    const switchProvider = async (newProvider: string) =>{
        setProviders((prevState)=>{
            storeProviderDetails({...prevState, selected: newProvider});
            return {...prevState, selected: newProvider};
        });
    }

    const connectProvider = async (network: string) => {
        if (network === 'solana') {
            return await connectSolanaProvider();
        } else if (network === 'erc') {
            return await connectERCProvider();
        }
    };

    const storeProviderDetails = (providerObj: WalletProvider) => {
        window.localStorage.setItem('providerDetails', JSON.stringify(providerObj));
    };

    const loadProviderDetails = ()=> {
        const providerCache = window.localStorage.getItem('providerDetails');
        console.log("Loaded data", providerCache)
        return providerCache === undefined ? null : JSON.parse(providerCache);
    }

    const providerValue = {
        connect: connectProvider,
        switchProvider: switchProvider,
        providers: providers,
        network: networkId
    };
 
    return (
        <Web3Context.Provider value={providerValue}>
            {children}
        </Web3Context.Provider>
    )
};

export default Web3Provider;