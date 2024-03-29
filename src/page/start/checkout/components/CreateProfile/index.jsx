import Typography from '../../../../../components/Typography';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ProfileContext from '../../../context/socialApp/profile.context';
import DatingContext from '../../../context/datingApp/dating.context';
// import RoundedButton from '../../../../../components/Button/Rounded.components';
import ipfsUtils from '../../../../../utils/web3/ipfs/ipfs.utils';
import { createProfileErc, getProfileErc } from '../../../../../utils/web3/contract/profileContract/erc';
import {
    createProfilePipelineSolana,
    // getProfileMappingSolana,
    getProfileSolana
} from '../../../../../utils/web3/contract/profileContract/solana';
import { useWallet } from '@solana/wallet-adapter-react';
import Web3Context from '../../../../../utils/web3/context/web3.context';
// import SolanaUtils from '../../../../../utils/web3/context/solana.utils';
import { PhantomWalletName } from '@solana/wallet-adapter-phantom';
import ERCUtils from '../../../../../utils/web3/context/erc.utils';

import { mainRoute } from '../../../../../commons/route';
import { Bars } from 'react-loader-spinner'; 
import ProfileContractUtils from '../../../../../utils/web3/contract/profileContract/utils';
import CreateProfilePopup from '../../../../../components/CreateProfilePopup';
import { Button } from 'antd';
import config from '../../../../../commons/config';

const barLoader = {
    Component: Bars,
    props: {
      color: '#5359F6',
      height: 100,
      width: 110,
    },
    name: 'Ball Triangle',
  };

const CheckoutCreateProfile = () => {

    const history = useHistory();
    const web3Context = useContext(Web3Context);
    // form data for upload
    const profileContext = useContext(ProfileContext);
    const datingContext = useContext(DatingContext);

    const [ id, setId ] = useState(null);
    const [ solTxn, setSolTxn ] = useState(false);
    const [ error, setError ] = useState({
        state: false,
        msg: ''
    });
    const [ isLoading, setIsLoading] = useState(false);
    const [ popupOpen, setPopupOpen ] = useState(false);
    const [ popupNetwork, setPopupNetwork ] = useState('');
    const [ isGasless, setIsGasless ] = useState(false);
    const [ cid, setCid ] = useState(null);
    const solanaWallet = useWallet();

    let logoWidth = 130;

    useEffect(() => {
        createProfileCid();
    }, [])

    // useEffect(
    //     async () => {
    //         console.log('solanaWallet:', solanaWallet);
    //         if (solTxn && solanaWallet.connected) {
    //             console.log('solana wallet is connecting. redo txn now');
    //             await createProfileOnSolana();
    //             setSolTxn(false);
    //         }
    //     },
    //     [ solanaWallet.connected ]
    // );

    // useEffect(
    //     () => {
    //         if (web3Context?.providers?.selected?.split('@')[1] === 'solana') {
    //             solanaWallet.select(PhantomWalletName);
    //         }
    //     },
    //     [ web3Context?.providers.selected ]
    // );

    const getCompletedProfile = ()=>{
        let profile = profileContext.getVisibleProfile();
        let datingInfo = datingContext.getVisibleProfile();
        profile.application["radianDating"] = datingInfo;
        return profile;    
    }

    const createProfileCid = async () => {
        let profile = getCompletedProfile();
        let _cid = await ProfileContractUtils.createProfileCid(profile);
        setCid(_cid);
    };

    const createProfilePolygon = async (useGasStation=false) => {
        setIsGasless(useGasStation);
        setPopupNetwork('polygon');
        setPopupOpen(true);
        return ;
    };

    const getProfile = async () => {
        let identityID;
        console.log('getProfile provider', web3Context.providers.selected);

        if (!web3Context.providers.selected) {
        } else if (web3Context.providers.selected.split('@')[1] === 'solana') {
            identityID = await getProfileSolana(solanaWallet);
            console.log('identityID', identityID);
        } else {
            identityID = await getProfileErc().identityID;
        }

        if (identityID) {
            let identity = await ipfsUtils.getContentJson(identityID);
            setId(identity);
        }
    };

    const createProfileOnSolana = async () => {
        setPopupNetwork('solana');
        setPopupOpen(true)
    };

    const styles = {
        button: {
            marginTop: `1rem`
        }
    };

    return (
        <>
        <div id="RD-CheckoutProfileRoot" className={isLoading && 'opacity-40'}>
            {isLoading &&
            <div className='fixed left-1/2 top-1/2 transform -translate-x-24 -translate-y-24 
                            bg-theme-lightGray p-5 bg-opacity-80 rounded-3xl'>
                    <Bars
                        { ...
                        {color: '#5359F6',
                        height: 120,
                        width: 160}}/>
            </div>}
            <div style={{ width:'fit-content'}} className="m-auto bg-theme-bg-light w-full max-w-screen-lg rounded text-theme-white">
                <div className="p-16 text-center">
                    <div>
                        <Typography.H2>Create profile on</Typography.H2>
                        <div className="pt-6 pb-6">Add interactivity tools to keep your audience engaged.</div>
                    </div>
                    <div className="">
                        <div className="inline-flex flex-wrap w-full justify-center">
                            
                            <div className="p-4">
                                <div className="text-center">
                                    <img
                                        className="m-auto"
                                        src={`${config.assets.cdn}/polygonRounded.png`}
                                        width={logoWidth}
                                        height={'auto'}
                                    />
                                    <div className="pt-4">Metamask</div>
                                </div>
                                <Button
                                    style={styles.button}
                                    type='primary'
                                    size='large'
                                    shape='round'
                                    onClick={e => createProfilePolygon(false)}
                                >
                                    Polygon
                                </Button>
                            </div>
                            
                            <div className="p-4">
                                <div className="text-center">
                                    <img
                                        className="m-auto"
                                        src={`${config.assets.cdn}/polygonRounded.png`}
                                        width={logoWidth}
                                        height={'auto'}
                                    />
                                    <div className="pt-4">Metamask</div>
                                </div>
                                <Button
                                    style={styles.button}
                                    type='primary'
                                    size='large'
                                    shape='round'
                                    disabled
                                    onClick={e => createProfilePolygon(true)}
                                >
                                    Polygon (Free)
                                </Button>
                            </div>
                            
                            <div className="p-4">
                                <div className="text-center">
                                    <img
                                        className="m-auto"
                                        src={`${config.assets.cdn}/solanaRounded.png`}
                                        width={logoWidth}
                                        height={'auto'}
                                    />
                                    <div className="pt-4">Phantom</div>
                                </div>
                                <Button
                                    style={styles.button}
                                    type='primary'
                                    size='large'
                                    shape='round'
                                    disabled
                                    onClick={e => createProfileOnSolana()}
                                >
                                    Solana
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div id="RD-CheckoutErrorMsg" className="h-2 mt-5 font-semibold text-theme-danger">
                        <span>{error.state && error.msg}</span>
                    </div>
                </div>
            </div>
        </div>
        <CreateProfilePopup 
            open={popupOpen} 
            network={popupNetwork} 
            setOpen={setPopupOpen}
            cid={cid}
            gasless={isGasless}
        />
        </>
    );
};

export default CheckoutCreateProfile;
