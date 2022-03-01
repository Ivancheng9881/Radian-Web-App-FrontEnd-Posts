import { FC, useEffect, useState } from "react";
import { FullProfile } from '../../../schema/profile/profile.interface';
import ProfileLoading from "./ProfileLoading.components";
import ProfileContent from "./ProfileContent.components";
import config from "../../../commons/config";
import FullProfileFrame from "./Frame.components";
import PendingLoading from "./PendingLogin.components";

interface PageProps {
    profile: FullProfile,
    isOwner?: boolean,
};

const styles = {
    root: { 
        height: '60vh', 
        minWidth: '400px', 
        minHeight: '480px',
        padding: `0.5rem 1rem`,
    },
    body: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: '0.5rem',
        backgroundColor: config.theme.backgroundLight
    }
} as const

const Full : FC<PageProps> = (props) => {

    return (
        <FullProfileFrame>
            {
                props.profile
                ? <ProfileContent profile={props.profile} isOwner={props.isOwner} />
                : <ProfileLoading />  
            }
        </FullProfileFrame>
    )
};

export {
    PendingLoading
};

export default Full

