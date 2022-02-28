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
                    profilePicture={ipfsUtils.getContentUrl(profile?.profilePictureCid)}
                    username={`${profile.firstName} ${profile.lastName}`}
                />
                <ProfileDetails profile={profile} />
            </Space>
        {/* {
            profile.identityID && 
                <div className="absolute right-5 bottom-5">
                    <img src="/icons/right_arrow.svg" width="50px" height="50px" alt="menu" />
                </div>
        } */}
        {/* { 
            profile.identityID ?
            <span className={`absolute w-fit text-theme-white bg-theme-bg-dark
                pt-1.5 pb-1.5 pl-3 pr-3 rounded-lg left-2 bottom-2 opacity-80`}>
                <div className='font-semibold text-3xl'>
                    {`${profile?.firstName} ${profile?.lastName}`}
                </div>
                <div className='font-normal text-sm'>
                    {`Gender: ${profile?.gender}`}
                </div>
                <div className='font-normal text-sm'>
                    {`Nationality: ${profile?.nationality}`}
                </div>
                <div className='font-normal text-sm'>
                    {`Interest: ${profile?.interest}`}
                </div>
            </span>
            : <span className={`absolute w-full text-theme-white pt-1.5 pb-1.5 pl-3 pr-3 rounded-lg 
            bottom-24 opacity-80 text-center`}>
            </span>

        } */}
    </div>
    )
};


export default ProfileContent