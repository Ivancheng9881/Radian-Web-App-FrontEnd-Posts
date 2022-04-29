import { useContext, useState, useRef, useEffect, useCallback, FC } from 'react';
import Web3Context from '../../../utils/web3/context/web3.context';
// import SolanaUtils from '../../utils/web3/context/solana.utils';
import { truncateAddress } from '../../../utils/web3/general/parser.utils';
import { useHistory, useLocation } from 'react-router-dom';
import { mainRoute, SIGNUP_INFO_ROUTE, SIGNUP_NFT_ROUTE, SIGNUP_PROPIC_ROUTE, SIGNUP_SUMMARY_ROUTE, SIGNUP_TOKEN_ROUTE } from '../../../commons/route';
import { preloadWalletIcon } from '../../../utils/preload';
import { Layout, Space, Typography } from 'antd';
import config from '../../../commons/config';
import NavBarWalletPopOver from './ConnectWallet.components';
import { FixLater } from '../../../schema/helper.interface';
import SIGNUP_ROUTER from '../../../page/signup/router';

const Navbar : FC = (props) => {

    const web3Context = useContext(Web3Context);

    const history = useHistory();
    const location = useLocation();
    const [ address, setAddress ] = useState({});
    const [ currentWallet, setCurrentWallet ] = useState('Connect'); 

    const erc = 'metamask@erc';
    const sol = 'phantom@solana';

    const routeToRadian = () => {
        routeToLandingPage({scrollToSection: 2})
    };

    const routeToHowTo = () => {
        routeToLandingPage({scrollToSection: 3})
    };

    const routeToLandingPage = (state: any) => {
        history.push({
            pathname: mainRoute,
            state: state
        })
    }

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
    );    
    
    const TRANS_NAVBAR_WHILTELIST = [
        SIGNUP_INFO_ROUTE,
        SIGNUP_TOKEN_ROUTE,
        SIGNUP_ROUTER,
        SIGNUP_PROPIC_ROUTE,
        SIGNUP_NFT_ROUTE,
        SIGNUP_SUMMARY_ROUTE
    ];

    const isSignupPage = !TRANS_NAVBAR_WHILTELIST.includes(location.pathname)

    return (
        <Layout.Header className={`${isSignupPage ? 'rd-header-solid' : 'rd-header-transparent'}`}>
            <div className={`rd-navbar-root`}>
                <a onClick={() => history.push(mainRoute)}>
                    {/* use small icon when on mobile */}
                    <img src={`${config.assets.cdn}/logo/logo_horizontal_200x50.png`} alt="radian logo" />
                </a>
                {/* Wallet address on Navbar */}
                {
                    isSignupPage
                }
                <Space className='rd-navbar-control-root' size='large'>
                    { isSignupPage && <>
                        <Typography.Text className='rd-navbar-menuitem' onClick={routeToRadian} >RADIAN</Typography.Text>
                        <Typography.Text className='rd-navbar-menuitem' onClick={routeToHowTo}>How to</Typography.Text>
                    </> }
                    <NavBarWalletPopOver />
                </Space>
            </div>
        </Layout.Header>
    );
};

export default Navbar;