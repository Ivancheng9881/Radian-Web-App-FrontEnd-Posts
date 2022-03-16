import { Avatar, Image, Space } from "antd";
import { FC } from "react";
import { FullProfile } from '../../../schema/profile/profile.interface';
import ipfsUtils from "../../../utils/web3/ipfs/ipfs.utils";
import ProfileAvatar from "./Avatar.components";
import ProfileSettings from "./ProfileSettings.components";
import ProfileDetails from "./ProfileDetails.components";

interface PropsType {
    profile: FullProfile,
    isOwner: boolean,
};

const styles = {
    root: {
        width: '100%',
        height: '100%',
        position: 'relative',
        padding: '1rem'
    },
    space: {
        width: '100%'
    },
    avatar: {
        width: 80
    }
} as const;

const ProfileContent : FC<PropsType> = ({
    profile,
    isOwner
}) => {

    return (
        <div style={styles.root}>
            <Space direction="vertical" style={styles.space}>
                { isOwner && <ProfileSettings />}
                <ProfileAvatar   
                    profilePicture={profile?.profilePictureCid[0]}
                    username={`${profile.firstName} ${profile.lastName}`}
                />
                <ProfileDetails profile={profile} />
            </Space>
    </div>
    )
};


export default ProfileContent