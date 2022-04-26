import Typography from '../../../../../components/Typography';
import { useContext, useEffect, useState } from 'react';
import ProfileContext from '../../../context/socialApp/profile.context';
import UploadButton from '../../../../../components/Button/UploadButton.components';
import ipfsUtils from '../../../../../utils/web3/ipfs/ipfs.utils';
import ProfilePictureFrame from '../../../../../components/ProfilePictureFrame';
import CreateProfileContext from '../../../context/profile/profile.context';
import { message } from 'antd';

const ProfilePicture = (props) => {
    
    const { profile, updateDataByKey } = useContext(ProfileContext);
    const { setNextDisabled } = useContext(CreateProfileContext);

    useEffect(() => {
        if (!profile.profilePictureCid || profile.profilePictureCid == 0) {
            setNextDisabled(true);
        } else {
            setNextDisabled(false);
        }
    }, [profile.profilePictureCid])

    const handleUpload = async (file) => {
        console.log("runnning");
        // console.log('file is updating', file);
        // only accept JPG or PNG file & Image smaller than 2MB
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.warning('You can only upload JPG or PNG file!');
            return;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.warning('Image must smaller than 2MB!');
            return;
        }

        console.log('file is updating', { isJpgOrPng: isJpgOrPng, isLt2M: isLt2M });
        // To check wether key already exists
        if (isJpgOrPng || isLt2M) {
            let newCid = await ipfsUtils.uploadContent(file);
            console.log("upload cid", newCid);
            if (profile.profilePictureCid.includes(newCid.toString())) {
                message.warning('Image Already Exists!');
                return;
            }
            let cidArr = [ ...profile.profilePictureCid, newCid.toString() ];
            updateDataByKey('profilePictureCid', cidArr);
            message.success('upload success!');
        }
    };

    const onCidDelete = (cidString) => {
        let cidToString = cidString;
        cidToString = cidToString.toString();

        let cidIndex = profile.profilePictureCid.indexOf(cidToString);
        console.log('deleting index', cidIndex);

        profile.profilePictureCid.splice(cidIndex, 1);
        message.success('delete success!');

        console.log("updating", profile.profilePictureCid);
        updateDataByKey('profilePictureCid', profile.profilePictureCid);

        return;
    };

    return (
        <div id="RD-CreateProfile-name" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Picture Upload</Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2 alignment="left">Upload pictures for your profile</Typography.H2>
            </div>
            <div className="block">
                <div className="inline-flex flex-wrap">
                    {profile.profilePictureCid.map((c, i) => {
                        return (
                            <div className="ml-5" key={i}>
                                <div
                                    style={{ width: 28, height: 28 }}
                                    className="text-center relative top-10 left-40 border-theme-danger bg-theme-danger text-theme-white rounded-full border-2 cursor-pointer"
                                    onClick={() => onCidDelete(c)}
                                >
                                    X
                                </div>
                                <ProfilePictureFrame src={c} />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="mt-10 inline-flex">
                <div className="max-w-sm mr-5">
                    <UploadButton placeholder={'Browse From'} handleUpload={handleUpload} />
                </div>
            </div>
        </div>
    );

};

export default ProfilePicture;
