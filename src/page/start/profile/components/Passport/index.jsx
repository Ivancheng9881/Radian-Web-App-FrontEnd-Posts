import Typography from "../../../../../components/Typography";
import { useContext, useEffect, useState } from "react";
import CreateProfileContext from "../../context/profile.context";
import PassportItem from "./item.components";
import RoundedButton from "../../../../../components/Button/Rounded.components";
import ipfsUtils from "../../../../../utils/web3/ipfs/ipfs.utils";
import { createProfileErc, getProfileErc } from "../../../../../utils/web3/contract/profileContract/erc";
import { createProfileSolana } from "../../../../../utils/web3/contract/profileContract/solana";
import { useWallet } from "@solana/wallet-adapter-react";

const ProfilePassport = (props) => {

    const { profile } = useContext(CreateProfileContext);
    const [ id, setId ] = useState(null);
    const solanaWallet = useWallet();

    useEffect(() => {
        getProfile();
    }, [])

    const createProfileCid = async () => {
        let profileString = JSON.stringify(profile);
        const cid = await ipfsUtils.uploadContent(profileString);
        if (cid) {
            let txn = await createProfileErc(cid.toString());
            if (txn) {
                await getProfile()
            }
        }
    };

    const getProfile = async () => {
        
        const { identityID } = await getProfileErc();
        if (identityID) {
            let identity = await ipfsUtils.getContentJson(identityID);
            setId(identity);    
        }
    };

    const creaetProfileOnSolana = async () => {
        await createProfileSolana(solanaWallet);
    }

    return (
        <div id="RD-CreateProfile-height" className="RD-CreateProfileComponents">
            <Typography.Featured
                alignment='left'
            >
                Radian Passport Summary
            </Typography.Featured>
            <RoundedButton 
                onClick={creaetProfileOnSolana}
            >
                create profile on solana
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