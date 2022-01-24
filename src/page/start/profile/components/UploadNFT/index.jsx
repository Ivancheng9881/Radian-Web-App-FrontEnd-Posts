import Typography from '../../../../../components/Typography';
import { useContext, useEffect, useState } from 'react';
import CreateProfileContext from '../../../context/profile/profile.context';
import CreateSnackbarContext from '../../../context/snackbar/snackbar.context';
import UploadButton from '../../../../../components/Button/UploadButton.components';
import ipfsUtils from '../../../../../utils/web3/ipfs/ipfs.utils';
import ProfilePictureFrame from '../../../../../components/ProfilePictureFrame';

const ProfileNFT = (props) => {
    const { profile, updateProfileByKey } = useContext(CreateProfileContext);
    const { setSnackBar } = useContext(CreateSnackbarContext);

    const [ cid, setCid ] = useState([]);

    const handleUpload = async (file) => {
        // console.log('file is updating', file);
        // only accept JPG or PNG file & Image smaller than 2MB
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            setSnackBar({ open: true, message: 'You can only upload JPG or PNG file!', severity: 'danger' });
            return;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            setSnackBar({ open: true, message: 'Image must smaller than 2MB!', severity: 'danger' });
            return;
        }
        console.log('file is updating', { isJpgOrPng: isJpgOrPng, isLt2M: isLt2M });
        // To check wether key already exists
        if (isJpgOrPng || isLt2M) {
            let newCid = await ipfsUtils.uploadContent(file);
            let cidArr = [ ...profile.nft, newCid.toString() ];
            updateProfileByKey('nft', cidArr);
            setSnackBar({ open: true, message: 'upload success!', severity: 'success' });
        }
    };

    useEffect(
        () => {
            setCid(profile.nft);
        },
        [ profile.nft, setCid ]
    );

    const onCidDelete = (cidString) => {
        let cidToString = cidString;
        cidToString = cidToString.toString();

        let cidIndex = cid.indexOf(cidToString);
        console.log('deleting index', cidIndex);

        let newCidArr = cid.splice(cidIndex, 1);
        setSnackBar({ open: true, message: 'delete success!', severity: 'success' });

        newCidArr = [ ...cid, newCidArr ];

        return newCidArr;
    };
    return (
        <div id="RD-CreateProfile-name" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Your assets</Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2 alignment="left">Show off your NFTs:</Typography.H2>
            </div>
            <div className="block">
                <div className="inline-flex">
                    {cid.map((c, i) => {
                        return (
                            <div className="" key={i}>
                                <div
                                    style={{ width: 28, height: 28 }}
                                    className="text-center relative top-10 left-40 border-theme-danger bg-theme-danger text-theme-white rounded-full border-2 cursor-pointer"
                                    onClick={() => onCidDelete(c)}
                                >
                                    X
                                </div>
                                <ProfilePictureFrame src={ipfsUtils.getContentUrl(c)} />
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

export default ProfileNFT;
