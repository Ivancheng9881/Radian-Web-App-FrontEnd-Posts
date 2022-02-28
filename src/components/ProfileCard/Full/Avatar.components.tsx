import { Avatar, Typography } from "antd";
import { FC } from "react";
import config from "../../../commons/config";

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
} as const


const ProfileAvatar : FC<PropsType> = (props) => {

    return (
        <div style={styles.root}>
            <Avatar style={styles.avatar} src={props.profilePicture} size={80} />
            <Typography.Title style={styles.username} level={4}>{props.username}</Typography.Title>
        </div>
    )
};

export default ProfileAvatar;