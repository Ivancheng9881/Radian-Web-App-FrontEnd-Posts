import { Button, Image, message, Typography, Upload } from "antd";
import { FC, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import ImgCrop from "antd-img-crop";
import { UploadFile } from "antd/lib/upload/interface";

import config from '../../../commons/config';
import { SIGNUP_INFO_ROUTE, SIGNUP_NFT_ROUTE } from "../../../commons/route";
import SignupAction from "../components/signupAction";
import SignupFormWrapper from "../components/signupFormWrapper";
import SignupReturn from "../components/signupReturn";
import ipfsUtils from "../../../utils/web3/ipfs/ipfs.utils";
import { ISignupContext } from "../type";
import SignupContext from "../context/signup.context";

const SignupProfilePicturePage : FC = () => {

    // context
    const history = useHistory<History>();
    const { info, setInfo } : ISignupContext = useContext(SignupContext);

    // state
    const [ previewImg, setPreviewImg ] = useState('');
    const [ file, setFile ] = useState<UploadFile>();
    const [ fileList, setFileList ] = useState<UploadFile[]>();
    const [ imgError, setImgError ] = useState<boolean>(true);

    const handleNextClick = async () => {
        if (!file) {
            return history.push(SIGNUP_NFT_ROUTE)
        };

        try {
            const uploadResponse = await handleImgUpload();

            if (uploadResponse) {
                return history.push(SIGNUP_NFT_ROUTE)
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleReturnClick = () => history.push(SIGNUP_INFO_ROUTE);

    /**
     * handle file upload to ipfs
     * @returns {boolean} upload status
     */
    const handleImgUpload = async () : Promise<boolean> => {
        try {
            const response = await ipfsUtils.uploadContent(file);

            let cid = response.toString();
            setInfo({
                ...info,
                profilePictureCid: [cid, ...info.profilePictureCid]
            })

            return true;
        } catch (error: any) {
            console.log(error)
        }
    }

    const validateImg = (file: any) : boolean => {
        let acceptedFileFormat = ['image/jpg', 'image/jpeg', 'image/png'];
        if (!acceptedFileFormat.includes(file.type)) {
            message.error('You can upload JPG/JPEG/PNG file!');
            return false
        }

        let maxImgSize = 1024 * 1024 / 2;
        if (file.size > maxImgSize) {
            message.error('Your file is large than 500KB');
            return false
        }

        return true;
    }

    const handleUploadClick = async (file: any, fileList: UploadFile[]) => {
        const validatedImg = validateImg(file);
        if (!validatedImg) {
            setImgError(true)
            return false;
        } else {
            setImgError(false)
            setFile(file);
            setFileList(fileList);
            try {
                let preview = await _getBase64(file);
                setPreviewImg(preview)
            } catch (error) {
                console.log(error)
            }
            return false
    
        }
    };

    const _getBase64 = async (file: any): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.toString());
            reader.onerror = error => reject(error);
        });
    };

    /**
     * handle remove pending image
     */
    const handleImgRemove = (file: UploadFile): void => {
        setFile(null);
        setPreviewImg('preview');
    };

    useEffect(() => {
        if (info.profilePictureCid.length > 0) {
            let src = ipfsUtils.getMediaUrl(info.profilePictureCid[0]);
            setPreviewImg(src);
            setImgError(false)
        }
    }, [info.profilePictureCid])


    return (
        <div className="rd-signup-body">
            <div className="rd-signup-illustration">
                <img src={`${config.assets.cdn}/signup/illustration_2_desktop.png`} />
            </div>
            <SignupFormWrapper>
                <div className="rd-signup-form-root">
                    <SignupReturn onClick={handleReturnClick} />
                    <div className="rd-signup-propic-root">
                        <div className="rd-signup-propic-body rd-flexbox">
                            <div className="rd-signup-propic-img">
                                <Image
                                    id="profile-image"
                                    width={300}
                                    fallback={`${config.assets.cdn}/misc/propic_placeholder.png`}
                                    src={previewImg}
                                    preview={false}
                                />
                            </div>
                            <div className="rd-signup-propic-info">
                                <div>
                                    <Typography.Title level={3}>
                                        Upload <br/>Profile Picture
                                    </Typography.Title>
                                    <div>
                                        <Typography.Text strong>
                                            Max file size 500KB
                                        </Typography.Text>
                                    </div>
                                </div>
                                <div>
                                    <ImgCrop grid quality={1} modalTitle='Edit Profile Picture' >
                                        <Upload 
                                            className="rd-upload-root rd-upload-root-light"
                                            beforeUpload={handleUploadClick}
                                            accept='image/png, image/jpg, image/jpeg'
                                            maxCount={1}
                                            fileList={fileList}
                                            onRemove={handleImgRemove}
                                        >
                                            <Button shape="round" size="large" type="primary" >
                                                Upload Now
                                            </Button>    
                                        </Upload>
                                    </ImgCrop>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SignupAction>
                        <Button 
                            className="rd-btn-light"
                            type="primary"
                            shape="round"
                            size="large"
                            onClick={handleNextClick}
                            disabled={imgError}
                        >
                            Next
                        </Button>
                    </SignupAction>
                </div>
            </SignupFormWrapper>
        </div>
    )
};

export default SignupProfilePicturePage;