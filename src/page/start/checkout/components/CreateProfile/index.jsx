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

const CheckoutCreateProfile = () => {
    const history = useHistory();
    const { web3Context } = useContext(Web3Context);
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
            if (web3Context?.providers.selected.split('@')[1] === 'solana') {
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

    getCompletedProfile();

    const createProfileCid = async () => {
        let profile = getCompletedProfile();
        let profileString = JSON.stringify(profile);
        console.log('before uploading', profile);
        const cid = await ipfsUtils.uploadContent(profileString);
        return cid;
    };

    const createProfilePolygon = async (useGasStation) => {
        let txn;
        let publicKey = await ERCUtils.connectWallet();
        // check if the wallet is connected
        if (publicKey) {
            console.log(window.ethereum.networkVersion == 137);
            if (window.ethereum.networkVersion != 137) {
                setError({ state: true, msg: 'Please switch to polygon network' });
                return;
            }
            setError({ state: false, msg: '' });
            console.log('is connected');
            let cid = await createProfileCid();
            try{
                txn = await createProfileErc(cid.toString(), useGasStation);                
            } catch (error) {
                setSnackBar({ open: true, message: error?.data?.message , severity: 'danger' });
            }
            // make this better
            if (txn) {
                // clear cache and move back
                profileContext.deleteUpdatingData();
                datingContext.deleteUpdatingData();
                history.push(mainRoute);
            }
        }
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

    const createProfileOnSolana = async (cid) => {
        setSnackBar({ open: true, message: 'Phantom Support Coming Soon!', severity: 'danger' });
        return;
        setSolTxn(true);
        console.log(solanaWallet);
        if (!solanaWallet.connected) {
            console.log('solana wallet not connected');
            console.log('trying to connect now');
            await solanaWallet.connect();
        } else {
            let cid = await createProfileCid();
            let txn = await createProfilePipelineSolana(solanaWallet, cid);
            console.log(txn);
        }
    };

    // const fetchProfileMappingSolana = async () => {
    //     let profileMapping = await getProfileMappingSolana(solanaWallet);
    //     console.log(profileMapping.profileId.toString());
    // };

    return (
        <div id="RD-CheckoutProfileRoot">
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
                                    onClick={() => createProfilePolygon(false)}
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
                                    onClick={() => createProfilePolygon(true)}
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
                                    onClick={createProfileOnSolana}
                                >
                                    <div className="pt-2 pb-2 text-sm px-5 md:px-10 md:text-base"> Coming Soon</div>
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
