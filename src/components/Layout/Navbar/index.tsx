import { useContext, useState, useRef, useEffect, useCallback, FC } from 'react';
import Web3Context from '../../../utils/web3/context/web3.context';
// import SolanaUtils from '../../utils/web3/context/solana.utils';
import { truncateAddress } from '../../../utils/web3/general/parser.utils';
import { useHistory } from 'react-router-dom';
import { mainRoute, settingProfileRoute } from '../../../commons/route';

import MetamaskIcon from '../../Icons/metamask.components';
import PhantomIcon from '../../Icons/phantom.components';
import Popup from 'reactjs-popup';
import { preloadWalletIcon } from '../../../utils/preload';
import UserContext from "../../../utils/user/context/user.context";
import ipfsUtils from "../../../utils/web3/ipfs/ipfs.utils";
import { Avatar, Button, Layout, Select, Space } from 'antd';
import WalletPopupContext from '../../../utils/WalletPopup/context/walletPopup.context';
import ProfileSettings from '../../ProfileCard/Full/ProfileSettings.components';
import config from '../../../commons/config';
import { useImage } from 'react-image';
import NavBarWalletPopOver from './ConnectWallet.components';
import { FixLater } from '../../../schema/helper.interface';

const Navbar : FC = (props) => {

    const web3Context = useContext(Web3Context);
    const profileContext = useContext(UserContext);
    const walletPopupContext = useContext(WalletPopupContext);

    const history = useHistory<History>();

    const { src } = useImage({
        srcList: ipfsUtils.getImageFromCDNFailover(profileContext.profile?.profilePictureCid),
        useSuspense: false,
    });

    const [ address, setAddress ] = useState({});
    const [ currentWallet, setCurrentWallet ] = useState('Connect'); 

    // const ref : React.RefObject<HTMLD> = useRef();
    // const close = () => ref.current.close();  
    
    const erc = 'metamask@erc';
    const sol = 'phantom@solana';

    useEffect(() => {
        renderWalletBody();
    }, [web3Context.providers])

    useEffect(() => {
        preloadWalletIcon()
            .then(console.log)
            .catch(console.error)
    }, [])

    useEffect(()=>{
        let addr : FixLater = {};
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
                    addr = 'Connect'
            }
            setCurrentWallet(addr);
        } else {
            setCurrentWallet('Connect')
        }
      },
      [web3Context.providers,],
    )
    

    // const switchWalletPriority = async (walletType) => {
        
    //     // attempt to connect to wallet if not connected
    //     if ( !web3Context.providers[walletType] ) {
    //         await web3Context.connect(walletType.split("@")[1]);
    //     }

    //     // switch new wallet to selected if successfully connected        
    //     if ( web3Context.providers[walletType] ) {
    //         web3Context.switchProvider(walletType);
    //     }

    //     // switch off the pop up
    //     close();
    // }

    // const handleWalletButtonClick = (e) => {
    //     walletPopupContext.setOpen(true);
    // }

    return (
        <Layout.Header className={`${history.location.pathname === mainRoute ? 'rd-header-solid' : 'rd-header-transparent'}`}>
            <div className={`rd-navbar-root`}>
                <a onClick={() => history.push(mainRoute)}>
                    {/* use small icon when on mobile */}
                    <img src={`${config.assets.cdn}/logo/logo_horizontal_200x50.png`} alt="radian logo" />
                </a>

                {/* Wallet address on Navbar */}
                <Space className='rd-navbar-control-root' size='large'>
                    <NavBarWalletPopOver />
                </Space>
            </div>
        </Layout.Header>
    );
};

export default Navbar;