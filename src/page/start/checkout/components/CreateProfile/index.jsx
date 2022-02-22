import Typography from '../../../../../components/Typography';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ProfileContext from '../../../../../utils/profile/context/profile.context';
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
import CreateSnackbarContext from '../../../context/snackbar/snackbar.context';
import { Bars } from 'react-loader-spinner'; 

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
    console.log("web3", web3Context);
    const { setSnackBar } = useContext(CreateSnackbarContext);
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
    const solanaWallet = useWallet();

    let logoWidth = 130;

    useEffect(
        async () => {
            console.log('solanaWallet:', solanaWallet);
            if (solTxn && solanaWallet.connected) {
                console.log('solana wallet is connecting. redo txn now');
                await createProfileOnSolana();
                setSolTxn(false);
            }
        },
        [ solanaWallet.connected ]
    );

    useEffect(
        () => {
            if (web3Context?.providers?.selected?.split('@')[1] === 'solana') {
                solanaWallet.select(PhantomWalletName);
            }
        },
        [ web3Context?.providers.selected ]
    );

    const getCompletedProfile = ()=>{
        let profile = profileContext.getUploadReadyObject();
        const datingInfo = datingContext.getUploadReadyObject();
        profile.application["radianDating"] = datingInfo;
        console.log("Adjusted", profile);
        return profile;    
    }

    const createProfileCid = async () => {
        let profile = getCompletedProfile();
        let profileString = JSON.stringify(profile);
        console.log('before uploading', profile);
        const cid = await ipfsUtils.uploadContent(profileString);
        return cid;
    };

    const createProfilePolygon = async (useGasStation) => {
        // disable if metamask is not the selected provider
        if (web3Context?.providers?.selected.split("@")[1] != 'erc'){
            setSnackBar({ open: true, message: "Please select an ethereum compatible wallet", severity: 'danger' });
            return;
        }

        setIsLoading(true);
        let txn;
        let publicKey = await ERCUtils.connectWallet();
        // check if the wallet is connected
        if (publicKey) {
            console.log(window.ethereum.networkVersion == 137);
            if (window.ethereum.networkVersion != 137) {
                setError({ state: true, msg: 'Please switch to polygon network' });
                setIsLoading(false);
                return;
            }
            setError({ state: false, msg: '' });
            console.log('is connected');
            let cid = await createProfileCid();
            try{
                txn = await createProfileErc(cid.toString(), useGasStation);                
            } catch (error) {
                setSnackBar({ open: true, message: error?.data?.message ? error?.data?.message : error.message, severity: 'danger' });
            }
            // make this better
            if (txn) {
                // clear cache and move back
                profileContext.deleteUpdatingData();
                datingContext.deleteUpdatingData();
                history.push(mainRoute);
            }
        }
        setIsLoading(false);
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

        // disable if metamask is not the selected provider
        if (web3Context?.providers?.selected?.split("@")[1] != 'solana'){
            setSnackBar({ open: true, message: "Please select a phantom compatible wallet", severity: 'danger' });
            return;
        }

        setIsLoading(true);
        setSolTxn(true);
        console.log("solana wallet", solanaWallet);
        if (!solanaWallet.connected) {
            console.log('solana wallet not connected');
            console.log('trying to connect now');
            await solanaWallet.connect();
        } else {
            let cid = await createProfileCid();
            let txn = await createProfilePipelineSolana(solanaWallet, cid);
            if (txn) {
                // clear cache and move back
                profileContext.deleteUpdatingData();
                datingContext.deleteUpdatingData();
                history.push(mainRoute);
            }
        }
        setIsLoading(false);
    };

    // const fetchProfileMappingSolana = async () => {
    //     let profileMapping = await getProfileMappingSolana(solanaWallet);
    //     console.log(profileMapping.profileId.toString());
    // };

    return (
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
                                        src="/logos/polygonRounded.png"
                                        width={logoWidth}
                                        height={'auto'}
                                    />
                                    <div className="pt-4">Metamask</div>
                                </div>
                                <div
                                    className={`mt-4 bg-theme-bg-dark w-max m-auto rounded-full cursor-pointer`}
                                    onClick={() => ! isLoading && createProfilePolygon(false)}
                                >
                                    <div className="pt-2 pb-2 text-sm px-5 md:px-10 md:text-base">Polygon</div>
                                </div>
                            </div>
                            
                            <div className="p-4">
                                <div className="text-center">
                                    <img
                                        className="m-auto"
                                        src="/logos/polygonRounded.png"
                                        width={logoWidth}
                                        height={'auto'}
                                    />
                                    <div className="pt-4">Metamask</div>
                                </div>
                                <div
                                    className={`mt-4 bg-theme-bg-dark w-max m-auto rounded-full cursor-pointer`}
                                    onClick={() => ! isLoading && createProfilePolygon(true)}
                                >
                                    <div className="pt-2 pb-2 text-sm px-5 md:px-10 md:text-base">Polygon (Free)</div>
                                </div>
                            </div>
                            
                            <div className="p-4">
                                <div className="text-center">
                                    <img
                                        className="m-auto"
                                        src="/logos/solanaRounded.png"
                                        width={logoWidth}
                                        height={'auto'}
                                    />
                                    <div className="pt-4">Phantom</div>
                                </div>
                                <div
                                    className="mt-4 bg-theme-bg-dark w-max m-auto rounded-full cursor-pointer"
                                    onClick={()=> ! isLoading && createProfileOnSolana()}
                                >
                                    <div className="pt-2 pb-2 text-sm px-5 md:px-10 md:text-base"> Solana </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="RD-CheckoutErrorMsg" className="h-2 mt-5 font-semibold text-theme-danger">
                        <span>{error.state && error.msg}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutCreateProfile;
