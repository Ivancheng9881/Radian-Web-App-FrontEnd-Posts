import { Button, Image, Typography, Upload } from "antd";
import { FC, useState } from "react";
import config from '../../../commons/config';
import { useHistory } from "react-router";
import { SIGNUP_INFO_ROUTE, SIGNUP_NFT_ROUTE } from "../../../commons/route";
import SignupAction from "../components/signupAction";
import SignupFormWrapper from "../components/signupFormWrapper";
import SignupReturn from "../components/signupReturn";
import ipfsUtils from "../../../utils/web3/ipfs/ipfs.utils";

const SignupProfilePicturePage : FC = () => {

    const history = useHistory<History>();

    const [ imageCid, setImageCid ] = useState<string>('');

    const handleNextClick = () => {
        history.push(SIGNUP_NFT_ROUTE);
    };

    const handleReturnClick = () => {
        history.push(SIGNUP_INFO_ROUTE);
    };

    const handleUploadClick = async (file: any, fileList: any) => {
        setImageCid(file.name);
        try {
            const response = await ipfsUtils.uploadContent(file);
            setImageCid(response.toString())
        } catch (error: any) {
            console.log(error)
        }
        return false
    }

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
                                    width={300}
                                    fallback={`${config.assets.cdn}/misc/propic_placeholder.png`}
                                    src={`${ipfsUtils.getMediaUrl(imageCid)}`}
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
                                            Max file size 10 MB
                                        </Typography.Text>
                                    </div>
                                </div>
                                <div>
                                    <Upload 
                                        className="rd-upload-root rd-upload-root-light"
                                        beforeUpload={handleUploadClick}
                                        accept='image/png, image/jpeg'
                                        maxCount={1}
                                    >
                                        <Button shape="round" size="large" type="primary" >
                                            Upload Now
                                        </Button>    
                                    </Upload>
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