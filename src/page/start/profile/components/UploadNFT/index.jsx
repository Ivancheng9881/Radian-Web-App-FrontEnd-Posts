import Typography from "../../../../../components/Typography";
import { useContext, useEffect, useState } from "react";
import CreateProfileContext from "../../../context/profile.context";
import UploadButton from "../../../../../components/Button/UploadButton.components";
import ipfsUtils from "../../../../../utils/web3/ipfs/ipfs.utils";
import ProfilePictureFrame from "../../../../../components/ProfilePictureFrame";

const ProfileNFT = (props) => {

    const { profile, updateProfileByKey } = useContext(CreateProfileContext);
    const [ cid, setCid ] = useState([]);

    const handleUpload = async (file) => {
        
        let newCid = await ipfsUtils.uploadContent(file);
        let cidArr = [...profile.nft, newCid.toString()];

        console.log(cidArr)

        updateProfileByKey('nft', cidArr);
    };


    useEffect(() => {
        setCid(profile.nft);
    }, [profile.nft])

    return (
        <div id="RD-CreateProfile-name" className="RD-CreateProfileComponents">
            <Typography.Featured
                alignment='left'
            >
                Your assets
            </Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2
                    alignment="left"
                >
                    Show off your NFTs:
                </Typography.H2>
            </div>
            <div className="block">
                <div className="inline-flex">
                    {
                        cid.map((c) => {
                            return (
                                <div className="" key={c}>
                                <ProfilePictureFrame 
                                    src={ipfsUtils.getContentUrl(c)}
                                />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="mt-10 inline-flex">
                <div className="max-w-sm mr-5">
                    <UploadButton
                        placeholder={'Browse From'}
                        handleUpload={handleUpload}
                    />
                </div>
            </div>
        </div>
    )
};


export default ProfileNFT;