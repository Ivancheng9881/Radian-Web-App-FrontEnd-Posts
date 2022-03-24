import React, { useEffect, useState, useContext, FC } from "react";
import UserContext from "../../../utils/user/context/user.context";
import Web3Context from "../../../utils/web3/context/web3.context";
import { ProfileContextInterface } from "../../../schema/profile/profile.interface";
import { FixLater } from "../../../schema/helper.interface";
import ProfileCard from "../../../components/ProfileCard";

const PersonalProfile: FC = (props) => {
    const userContext: ProfileContextInterface = useContext(UserContext); // load profile info from provider
    const web3Context: FixLater = useContext(Web3Context);
    const profile = userContext.profile;

    console.log(profile)

    return (
        <>
            {
                web3Context.providers.selected 
                ? ( userContext.profile?.identityID 
                    ? <ProfileCard.Full profile={profile} isOwner />
                    : <ProfileCard.PendingCreate />
                )
                : <ProfileCard.PendingLoading />
            }
        </>
    )
}

export default PersonalProfile;