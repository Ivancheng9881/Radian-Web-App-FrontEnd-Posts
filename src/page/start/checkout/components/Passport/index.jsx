import Typography from "../../../../../components/Typography";
import { useContext, useEffect, useState } from "react";
import CreateProfileContext from "../../../context/profile.context";
import PassportItem from "./item.components";
import RoundedButton from "../../../../../components/Button/Rounded.components";
import ipfsUtils from "../../../../../utils/web3/ipfs/ipfs.utils";
import { createProfileErc, getProfileErc } from "../../../../../utils/web3/contract/profileContract/erc";
import { createProfilePipelineSolana, getProfileMappingSolana, getProfileSolana } from "../../../../../utils/web3/contract/profileContract/solana";
import { useWallet } from "@solana/wallet-adapter-react";
import Web3Context from "../../../../../utils/web3/context/web3.context";
import SolanaUtils from "../../../../../utils/web3/context/solana.utils";
import { PhantomWalletName } from "@solana/wallet-adapter-phantom";

const ProfilePassport = (props) => {

    const { provider, wallet } = useContext(Web3Context);
    const { profile } = useContext(CreateProfileContext);
    const [ id, setId ] = useState(null);
    const solanaWallet = useWallet();


    useEffect(() => {
        getProfile();
    }, [])

    useEffect(() => {
        // console.log(provider)
        // console.log(solanaWallet)
        // if (provider.split('@')[1] === 'solana') {
        //     if (!solanaWallet.connected) {
        //         initSolanaWallet();
        //     }
        // }
        console.log(solanaWallet)
        if (solanaWallet.wallet) {
            if (!solanaWallet.connected) {
                solanaWallet.connect()
            } else {
                getProfile();
            }
        }
    }, [solanaWallet]);


    useEffect(() => {
        if (provider.split('@')[1] === 'solana') {
            solanaWallet.select(PhantomWalletName);
        }
    }, [provider]);

    const createProfileCid = async () => {
        let txn;

        let profileString = JSON.stringify(profile);
        const cid = await ipfsUtils.uploadContent(profileString);
            
        if (provider.split('@')[1] === 'solana') {
            txn = await createProfileOnSolana(cid.toString());
        } else {
            txn = await createProfileErc(cid.toString());
        }

        if (txn) {
            await getProfile()
        }
    };

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
        if (!solanaWallet.connected) {
            await solanaWallet.connect()
        } else {
            console.log(solanaWallet)
            await createProfilePipelineSolana(solanaWallet, cid);
        }
    };

    const fetchProfileMappingSolana = async () => {
        let profileMapping = await getProfileMappingSolana(solanaWallet);
        console.log(profileMapping.profileId.toString());
    }

    return (
        <div id="RD-CreateProfile-height" className="RD-CreateProfileComponents">
            <Typography.Featured
                alignment='left'
            >
                Radian Passport Summary
            </Typography.Featured>
            <RoundedButton 
                onClick={createProfileCid}
            >
                {solanaWallet.connected ? `create profile on solana` : `connect wallet`}
            </RoundedButton>
            {/* <RoundedButton
                onClick={createProfileCid}
            >
                create profile id
            </RoundedButton> */}
            <div className="w-4/5">
                <div className="inline items-end">
                    <div className="mt-10 w-full">
                        <div className="block">
                            {
                                id && Object.keys(id).map((i) => {
                                    let val = JSON.stringify(id[i]);
                                    let contentType = i == 'profilePictureCid' ? 'image' : 'text';
                                    return (
                                        <PassportItem  
                                            label={i}
                                            value={val}
                                            contentType={contentType}
                                        />
                                    )
                                })
                            }
{/* 
                            <PassportItem  
                                label='Date of Birth'
                                value={`${profile.day}/${profile.month}/${profile.year}`}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};


export default ProfilePassport;