import { useContext, useState, useRef, useEffect, useCallback } from 'react';
import Web3Context from '../../utils/web3/context/web3.context';
// import SolanaUtils from '../../utils/web3/context/solana.utils';
import RoundedButton from '../Button/Rounded.components';
import { truncateAddress } from '../../utils/web3/general/parser.utils';
import { useHistory } from 'react-router-dom';
import { mainRoute, settingProfileRoute } from '../../commons/route';
import './styles.css';

import MetamaskIcon from '../Icons/metamask.components';
import PhantomIcon from '../Icons/phantom.components';
import Popup from 'reactjs-popup';
import { preloadWalletIcon } from '../../utils/preload';
import UserContext from "../../utils/user/context/user.context";
import ipfsUtils from "../../utils/web3/ipfs/ipfs.utils";
import { Button, Layout, Select } from 'antd';
import WalletPopupContext from '../../utils/WalletPopup/context/walletPopup.context';
import ProfileSettings from '../ProfileCard/Full/ProfileSettings.components';

const Navbar = (props) => {

    const web3Context = useContext(Web3Context);
    const profileContext = useContext(UserContext);
    const walletPopupContext = useContext(WalletPopupContext);

    const history = useHistory();

    const [ address, setAddress ] = useState({});
    const [ currentWallet, setCurrentWallet ] = useState('Connect Wallet'); 

    const ref = useRef();
    const close = () => ref.current.close();  
    
    const erc = 'metamask@erc';
    const sol = 'phantom@solana';

    useEffect(() => {
        renderWalletBody();
    }, [web3Context.providers])

    // const dropdownEl = [
    //     { 
    //         label: <span style={{display: 'flex', alignItems: 'center'}}>
    //             <PhantomIcon height={35} width={'auto'}/>
    //             {"SOL: " + address[sol]}
    //         </span> , 
    //         value: 'metamask@erc'
    //     },
    //     { 
    //         label: <span style={{display: 'flex', alignItems: 'center'}}>
    //             <MetamaskIcon height={35} width={'auto'}/>
    //             {"ERC: " + address[erc]}
    //         </span> , 
    //         value: 'phantom@solana'
    //     },
    //     {
    //         label: <span style={{display: 'flex'}}>Connect Wallet</span>,
    //         value: 'ConnectWallet'   
    //     }
    // ]

    useEffect(() => {
        preloadWalletIcon()
            .then(console.log)
            .catch(console.error)
    }, [])

    useEffect(()=>{
        let addr = {};
        Object.keys(web3Context.providers).map((p, idx) => {
            let a = '';
            if (!web3Context.providers[p]) {}
            else if (p == erc) {
                a = truncateAddress(web3Context.providers[p]);
            } 
            else if (p == sol) {
                a = truncateAddress(web3Context.providers[p].toBase58(), 8)
            }
            addr[p] = a;
        });
        setAddress(addr);
    },[web3Context.providers]);

    const renderWalletBody = useCallback(
      () => {
        if (web3Context.providers?.selected) {
            let addr = web3Context.providers[web3Context.providers.selected];
            switch(web3Context.providers.selected) {
                case erc:
                    addr = 'metamask: ' + truncateAddress(addr);
                    break
                case sol:
                    addr = 'phantom: ' + truncateAddress(addr.toBase58(), 8);
                    break
                default:
                    addr = 'Connect Wallet'
            }
            setCurrentWallet(addr);
        } else {
            setCurrentWallet('Connect Wallet')
        }
      },
      [web3Context.providers,],
    )
    

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

    const handleWalletButtonClick = (e) => {
        walletPopupContext.setOpen(true);
    }

    return (
        <Layout.Header
            style={{ position: 'fixed', zIndex: 1, width: '100%' }}
        >

        <div id="RD-navbar">
                <a onClick={() => history.push(mainRoute)}>
                    {/* use small icon when on mobile */}
                    <img className='absolute top-4 left-4 invisible sm:visible' src="/logos/radian.png" width="149px" height="41px" alt="radian logo" />
                    <img className='absolute top-4 left-5 visible sm:invisible' src="/logo192.png" width="41px" height="41px" alt="radian logo small" />
                </a>

                {/* Wallet address on Navbar */}
                <div className={`absolute pr-2 right-24`}>
                    <Button shape='round' size='large' type='primary' onClick={handleWalletButtonClick} >
                        {currentWallet}
                    </Button>
                </div>

                {profileContext.profile?.identityID &&
                <div className="absolute top-4 right-4 w-10 h-10 cursor-pointer rounded-full"
                    style={{
                        backgroundImage: `${ipfsUtils.getBkgdImageFromCDNFailover(profileContext.profile?.profilePictureCid)}`,
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover'
                    }}
                    // to do direct people to profile
                    onClick={e => history.push(settingProfileRoute)}>
                </div>}

                <div className="absolute top-5 right-16 cursor-pointer">
                    <ProfileSettings />
                </div>
        </div>
        </Layout.Header>
    );
};

export default Navbar;