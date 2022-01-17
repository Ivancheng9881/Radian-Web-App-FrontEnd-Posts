import Typography from "../../../../../components/Typography";
import { useContext, useEffect, useState } from "react";
import CreateProfileContext from "../../../context/profile.context";
import RoundedButton from "../../../../../components/Button/Rounded.components";
import ipfsUtils from "../../../../../utils/web3/ipfs/ipfs.utils";
import { createProfileErc, getProfileErc } from "../../../../../utils/web3/contract/profileContract/erc";
import { createProfilePipelineSolana, getProfileMappingSolana, getProfileSolana } from "../../../../../utils/web3/contract/profileContract/solana";
import { useWallet } from "@solana/wallet-adapter-react";
import Web3Context from "../../../../../utils/web3/context/web3.context";
import SolanaUtils from "../../../../../utils/web3/context/solana.utils";
import { PhantomWalletName } from "@solana/wallet-adapter-phantom";
import ERCUtils from "../../../../../utils/web3/context/erc.utils";

const CheckoutCreateProfile = () => {

    const { provider, wallet } = useContext(Web3Context);
    const { profile } = useContext(CreateProfileContext);
    const [ id, setId ] = useState(null);
    const [ solTxn, setSolTxn ] = useState(false);
    const solanaWallet = useWallet();

    let logoWidth = 130;

    useEffect(async () => {
        console.log(solanaWallet);
        if (solTxn && solanaWallet.connected) {
            console.log('solana wallet is connecting. redo txn now')
            await createProfileOnSolana();
            setSolTxn(false);
        } 
    }, [solanaWallet.connected])


    useEffect(() => {
        if (provider.split('@')[1] === 'solana') {
            solanaWallet.select(PhantomWalletName);
        }
    }, [provider]);

    const createProfileCid = async () => {
        let profileString = JSON.stringify(profile);
        const cid = await ipfsUtils.uploadContent(profileString);
        return cid;
    };

    const createProfilePolygon = async () => {
        let txn; 
        let publicKey = await ERCUtils.connectWallet();
        // check if the wallet is connected
        if(publicKey) {
            console.log('is connected')
            let cid = await createProfileCid();
            txn = await createProfileErc(cid.toString());
        }
    }

    const getProfile = async () => {
        let identityID;
        console.log(provider);

        if (!provider) {
            //
        } else if (provider.split('@')[1] === 'solana') {
            identityID = await getProfileSolana(solanaWallet);
            console.log(identityID)
        } else {
            identityID = await getProfileErc().identityID;
        }
        
        if (identityID) {
            let identity = await ipfsUtils.getContentJson(identityID);
            setId(identity);
        }
    };



    const createProfileOnSolana = async (cid) => {
        setSolTxn(true);
        console.log(solanaWallet)
        if (!solanaWallet.connected) {
            console.log('solana wallet not connected');
            console.log('trying to connect now')
            await solanaWallet.connect();
        } else {
            let cid = await createProfileCid();
            let txn = await createProfilePipelineSolana(solanaWallet, cid);
            console.log(txn)
        }

    };

    const fetchProfileMappingSolana = async () => {
        let profileMapping = await getProfileMappingSolana(solanaWallet);
        console.log(profileMapping.profileId.toString());
    }

    return (
        <div id="RD-CheckoutProfileRoot">
            <div className="m-auto bg-theme-bg-light w-full max-w-screen-lg rounded text-theme-white">
                <div className="p-16 text-center">
                    <div>
                        <Typography.H2>
                            Create profile on
                        </Typography.H2>
                        <div className="pt-6 pb-6">
                            Add interactivity tools to keep your audience engaged.
                        </div>
                    </div>
                    <div className="">
                        <div className="inline-flex w-full">
                            <div className="p-4 w-1/2 ">
                                <div className="text-center">
                                    <img 
                                        className="m-auto"
                                        src='/logos/polygonRounded.png'
                                        width={logoWidth}
                                        height={'auto'}
                                    />
                                    <div className="pt-4">
                                        Metamask
                                    </div>
                                </div>
                                <div 
                                    className="mt-4 bg-theme-bg-dark w-max m-auto rounded-full cursor-pointer"
                                    onClick={createProfilePolygon}
                                > 
                                    <div className="pt-2 pb-2 pl-10 pr-10 text-2xl">
                                        Polygon
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 w-1/2 ">
                                <div className="text-center">
                                    <img 
                                        className="m-auto"
                                        src='/logos/solanaRounded.png'
                                        width={logoWidth}
                                        height={'auto'}
                                    />
                                    <div className="pt-4">
                                        Phantom
                                    </div>
                                </div>
                                <div 
                                    className="mt-4 bg-theme-bg-dark w-max m-auto rounded-full cursor-pointer"
                                    onClick={createProfileOnSolana}
                                > 
                                    <div className="pt-2 pb-2 pl-10 pr-10 text-2xl">
                                        Solana
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default CheckoutCreateProfile