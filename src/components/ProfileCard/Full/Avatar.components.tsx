import { Avatar, Typography } from "antd";
import { FC } from "react";
import { useImage } from 'react-image';
import ipfsUtils from "../../../utils/web3/ipfs/ipfs.utils";

interface PropsType {
    profilePicture?: string;
    username?: string
}

const styles = {
    root: {
        display: 'flex',
        alignItems: 'flex-end'
    },
    avatar: {
    },
    username: {
        display: 'flex',
        marginBottom: '0',
        marginLeft: '1rem'
    }
} as const;

const ProfileAvatar : FC<PropsType> = (props) => {

    const { src } = useImage({
        srcList: ipfsUtils.getImageFromCDNFailover(props.profilePicture),
        useSuspense: false,
    });

    return (
        <div style={styles.root}>
            <Avatar style={styles.avatar} src={src} size={80} />
            <Typography.Title style={styles.username} level={4}>{props.username}</Typography.Title>
        </div>
    )
};

export default ProfileAvatar;