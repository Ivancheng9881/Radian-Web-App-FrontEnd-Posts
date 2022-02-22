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
import ProfileContext from "../../utils/profile/context/profile.context";
import ipfsUtils from "../../utils/web3/ipfs/ipfs.utils";

const Navbar = (props) => {
    const web3Context = useContext(Web3Context);
    const history = useHistory();
    const [ itemState, setItemState ] = useState([]);

    const profileContext = useContext(ProfileContext);
    
    const ref = useRef();
    const close = () => ref.current.close();    

    const getElement = (providerType, click=true)=>{

        if (providerType === "metamask@erc"){
            return web3Context.providers[providerType]?
                <RoundedButton
                    onClick={() => {return click ? switchWalletPriority(providerType) : null}}>
                    {"ERC: " + truncateAddress(web3Context.providers[providerType])}
                </RoundedButton> :
                <RoundedButton 
                    onClick={()=>{return click ? switchWalletPriority(providerType) : null}}>
                        <MetamaskIcon height={60} width={120}/>
                </RoundedButton>
        } else if  (providerType === "phantom@solana") {
            return web3Context.providers[providerType]?
                <RoundedButton 
                    onClick={() => {return click ? switchWalletPriority(providerType) : null}}>
                    {"SOL: " + truncateAddress(web3Context.providers[providerType].toBase58(), 8)}
                </RoundedButton> :
                <RoundedButton 
                    onClick={()=>{return click ? switchWalletPriority(providerType) : null}}>
                    <PhantomIcon height={60} width={120}/>
                </RoundedButton>
        } else {
            return  <RoundedButton
                        onClick={()=>{}}>
                        <div>
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
            <div className="relative p-4 h-20 bg-theme-bg-light RD-shadow flex justify-between">
                
                <div className="cursor-pointer" onClick={() => history.push(mainRoute)}>
                    {/* use small icon when on mobile */}
                    <img className='absolute top-4 left-4 invisible sm:visible' src="/logos/radian.png" width="149px" height="41px" alt="radian logo" />
                    <img className='absolute top-4 left-5 visible sm:invisible' src="/logo192.png" width="41px" height="41px" alt="radian logo small" />
                </div>

                {/* Wallet address on Navbar */}
                {(window.ethereum || window.solana) &&
                <div className={`absolute top-4 pr-2 ${ profileContext.profile?.identityID === "" ? 'right-14' : 'right-24'}`}>
                    <Popup
                        trigger={<button>
                                    {itemState[0]}                                     
                                </button>} 
                        position="bottom right"
                        closeOnDocumentClick
                        arrow={false}
                        ref={ref}
                        >
                        <div className="pt-1">
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
                }

                {profileContext.profile?.identityID &&
                <div className="absolute top-4 right-14 w-10 h-10 cursor-pointer rounded-full"
                    style={{
                        backgroundImage: `url(${ipfsUtils.getContentUrl(profileContext.profile?.profilePictureCid)})`,
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover'
                    }}
                    // to do direct people to profile
                    onClick={() => {}}>
                </div>}

                <div className="absolute top-6 right-4 cursor-pointer" onClick={() => {}}>
                    <img src="/icons/menu.svg" width="30px" height="22px" alt="menu" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
