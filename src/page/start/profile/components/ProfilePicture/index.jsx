import Typography from '../../../../../components/Typography';
import { useContext, useEffect, useState } from 'react';
import CreateProfileContext from '../../../context/profile/profile.context';
import CreateSnackbarContext from '../../../context/snackbar/snackbar.context';
import UploadButton from '../../../../../components/Button/UploadButton.components';
import ipfsUtils from '../../../../../utils/web3/ipfs/ipfs.utils';
import ProfilePictureFrame from '../../../../../components/ProfilePictureFrame';

const ProfilePicture = (props) => {
    const { profile, updateProfileByKey } = useContext(CreateProfileContext);
    const { setSnackBar } = useContext(CreateSnackbarContext);
    const [ cid, setCid ] = useState(null);

    const handleUpload = async (file) => {
        console.log('Upload image...', file);
        // only accept JPG or PNG file & Image smaller than 2MB
        const isJpgOrPng = file['type'] === 'image/jpeg' || file['type'] === 'image/png';
        if (!isJpgOrPng) {
            setSnackBar({ open: true, message: 'You can only upload JPG or PNG file!', severity: 'danger' });
            return;
        }
        const isLt2M = file['size'] / 1024 / 1024 < 2;
        if (!isLt2M) {
            setSnackBar({ open: true, message: 'Image must smaller than 2MB!', severity: 'danger' });
            return;
        }

        // upload content to ipfs only if image file type correct
        const uploadCidResp = await ipfsUtils.uploadContent(file);
        // console.log('handleUploadCid', uploadCidResp);
        updateProfileByKey('profilePictureCid', uploadCidResp.toString());
        setSnackBar({ open: true, message: 'upload success!', severity: 'success' });
    };

    useEffect(
        () => {
            console.log('useEffect', profile.profilePictureCid);
            if (profile.profilePictureCid) {
                setCid(profile.profilePictureCid);
            }
        },
        [ profile.profilePictureCid, setCid ]
    );

    return (
        <div id="RD-CreateProfile-name" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Picture Upload</Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2 alignment="left">Upload pictures for your profile</Typography.H2>
            </div>
            <div>{cid && <ProfilePictureFrame src={cid && ipfsUtils.getContentUrl(cid)} />}</div>
            <div className="mt-10 inline-flex">
                <div className="max-w-sm mr-5">
                    <UploadButton value={profile.lastName} placeholder={'Browse From'} handleUpload={handleUpload} />
                </div>
            </div>
        </div>
    );
};

export default ProfilePicture;
