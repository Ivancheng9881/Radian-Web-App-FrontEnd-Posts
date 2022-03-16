import { Button, message, Space, Upload } from "antd";
import { FC, useEffect, useState } from "react";
import ProfilePictureFrameRoot from "./frame";
import UploadButton from "../Button/UploadButton.components";
import MediaUtils from "../../utils/mediaUpload";
import { FixLater } from "../../schema/helper.interface";
import { useImage } from 'react-image';
import ipfsUtils from "../../utils/web3/ipfs/ipfs.utils";

interface PropsType {
    cid: string,
    onUpload: FixLater,
    disabled?: boolean
    maxHeight?: number,
    maxWidth?: number
}

const ProfilePictureUpload : FC<PropsType> = (props) => {

    const [ imageUrl, setImageUrl ] = useState<string>('');
    const {src} = useImage({
        srcList: ipfsUtils.getImageFromCDNFailover(props.cid),
        useSuspense: false,
    })

    useEffect(() => {
        if (props.cid) {
            setImageUrl(props.cid);
        }
    }, [props.cid]);

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
                <img src={src} />
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


