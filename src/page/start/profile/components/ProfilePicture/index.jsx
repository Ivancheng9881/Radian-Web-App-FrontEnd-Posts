import Typography from "../../../../../components/Typography";
import { useContext, useEffect, useState } from "react";
import CreateProfileContext from "../../../context/profile.context";
import UploadButton from "../../../../../components/Button/UploadButton.components";
import ipfsUtils from "../../../../../utils/web3/ipfs/ipfs.utils";
import ProfilePictureFrame from "../../../../../components/ProfilePictureFrame";

const ProfilePicture = (props) => {

    const { profile, updateProfileByKey } = useContext(CreateProfileContext);
    const [ cid, setCid ] = useState(null);

    const handleUpload = async (file) => {
        const cid = await ipfsUtils.uploadContent(file);
        console.log(cid);
        updateProfileByKey('profilePictureCid', cid.toString())
    };


    useEffect(() => {
        setCid(profile.profilePictureCid);
    }, [profile.profilePictureCid])

    return (
        <div id="RD-CreateProfile-name" className="RD-CreateProfileComponents">
            <Typography.Featured
                alignment='left'
            >
                Picture Upload
            </Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2
                    alignment="left"
                >
                    Upload pictures for your profile
                </Typography.H2>
            </div>
            <div>
                <ProfilePictureFrame 
                    src={cid && ipfsUtils.getContentUrl(cid)}
                />
            </div>
            <div className="mt-10 inline-flex">
                <div className="max-w-sm mr-5">
                    <UploadButton
                        value={profile.lastName}
                        placeholder={'Browse From'}
                        handleUpload={handleUpload}
                    />
                </div>
            </div>
        </div>
    )
};


export default ProfilePicture;