import { useContext, useState, useRef, useEffect } from 'react';
import Web3Context from '../../utils/web3/context/web3.context';
// import SolanaUtils from '../../utils/web3/context/solana.utils';
import RoundedButton from '../Button/Rounded.components';
import { truncateAddress } from '../../utils/web3/general/parser.utils';
import { useHistory } from 'react-router-dom';
import { mainRoute } from '../../commons/route';
import './styles.css';

import MetamaskIcon from '../Icons/metamask.components';
import PhantomIcon from '../Icons/phantom.components';
import Popup from 'reactjs-popup';
import { preloadWalletIcon } from '../../utils/preload';

const Navbar = (props) => {
    const web3Context = useContext(Web3Context);
    const history = useHistory();
    const [ itemState, setItemState ] = useState([]);
    
    const ref = useRef();
    const close = () => ref.current.close();    

    const getElement = (providerType, click=true)=>{

        if (providerType === "metamask@erc"){
            return web3Context.providers[providerType]?
                <RoundedButton onClick={() => {return click ? switchWalletPriority(providerType) : null}}>
                            {"ERC: " + truncateAddress(web3Context.providers[providerType])}
                </RoundedButton> :
                <RoundedButton onClick={()=>{return click ? switchWalletPriority(providerType) : null}}>
                        <MetamaskIcon height={60} width={120}/>
                </RoundedButton>
        } else if  (providerType === "phantom@solana") {
            return web3Context.providers[providerType]?
                <RoundedButton onClick={() => {return click ? switchWalletPriority(providerType) : null}}>
                    {"Solana: " + truncateAddress(web3Context.providers[providerType].toBase58())}
                </RoundedButton> :
                <RoundedButton onClick={()=>{return click ? switchWalletPriority(providerType) : null}}>
                        <PhantomIcon height={60} width={120}/>
                </RoundedButton>
        } else {
            return  <RoundedButton onClick={()=>{}}>
                        <div className='text-xl'>
                            Connect Wallet
                        </div>
                    </RoundedButton>
        }
    }

    useEffect(() => {
        preloadWalletIcon()
            .then(console.log)
            .catch(console.error)
    }, [])
    

    useEffect(()=>{

        console.log("Navbar provider", web3Context.providers);
        const newItemState = [ getElement(web3Context.providers.selected, false) ];
        const keys = Object.keys(web3Context.providers);
        for ( let k = 0 ; k < keys.length ; k++ ) {
            if (keys[k] !== web3Context.providers.selected && keys[k] !== "selected" ) {
                newItemState.push(getElement(keys[k]));
            }
        }
        setItemState(newItemState);
    },[web3Context.providers]);

    const switchWalletPriority = async (walletType) => {
        
        // attempt to connect to wallet if not connected
        if ( !web3Context.providers[walletType] ) {
            await web3Context.connect(walletType.split("@")[1]);
        }

        // switch new wallet to selected if successfully connected        
        if ( web3Context.providers[walletType] ) {
            web3Context.switchProvider(walletType);
        }

        // switch off the pop up
        close();
    }

    return (
        <div id="RD-navbar" className="fixed w-full top-0 z-50">
            <div className="p-4 h-20 bg-theme-bg-light RD-shadow flex justify-between">
                <div className="cursor-pointer" onClick={() => history.push(mainRoute)}>
                    <img src="/logos/radian.png" width="149px" height="41px" alt="radian logo" />
                </div>

                {/* Wallet address on Navbar */}
                <div>
                    <Popup
                        trigger={<button>
                                    {itemState[0]}                                     
                                </button>} 
                        position="bottom center"
                        closeOnDocumentClick
                        arrow={false}
                        ref={ref}
                        >
                        <div className="pt-1 pl-7">
                            {itemState.slice(1,itemState.length).map(
                                (b,i)=>{
                                    return  <div key={i}>
                                                {b}
                                                <div className='pt-1'></div>
                                            </div>
                                }
                            )} 
                        </div>
                    </Popup>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
