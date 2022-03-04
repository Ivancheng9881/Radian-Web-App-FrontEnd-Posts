import { Button, message, Space, Upload } from "antd";
import { FC, useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import ProfilePictureFrame from ".";
import ProfilePictureFrameRoot from "./frame";
import config from "../../commons/config";
import { useRef } from "react";
import UploadButton from "../Button/UploadButton.components";
import MediaUtils from "../../utils/mediaUpload";
import { ipfsContentRoot } from "../../commons/web3";
import { FixLater } from "../../schema/helper.interface";

interface PropsType {
    src: string,
    onUpload: FixLater,
    disabled?: boolean
    maxHeight?: number,
    maxWidth?: number
}

const ProfilePictureUpload : FC<PropsType> = (props) => {

    const [ imageUrl, setImageUrl ] = useState<string>('');

    useEffect(() => {
        if (props.src) {
            setImageUrl(props.src);
        }
    }, [props.src]);

    const handleUpload = async (file: any) => {
        try {
            const cid = await MediaUtils.Upload.image(file);
            handleImageUrlUpdate(cid);
        } catch(err: any) {
            const errMsg = MediaUtils.Error(err.statusCode);
            message.error(errMsg)
        }
    };

    const handleImageUrlUpdate = (cid: string) => {
        // setImageUrl(`${ipfsContentRoot}${cid}`);
        props.onUpload(cid);
    }

    return (
        <Space direction="horizontal">
            <ProfilePictureFrameRoot >
                <img src={imageUrl} />
            </ProfilePictureFrameRoot>
                <UploadButton 
                    placeholder={'change profile picture'}
                    handleUpload={handleUpload}
                    disabled={props.disabled}
                />
        </Space>
        
    )
};

export default ProfilePictureUpload;


