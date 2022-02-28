import React, { useEffect, useState, useContext, FC } from "react";
import { useHistory } from "react-router";
import { startRoute, createProfileRoute, profileRoute } from "../../../commons/route";
import ipfsUtils from "../../../utils/web3/ipfs/ipfs.utils";
import UserContext from "../../../utils/user/context/user.context";
import Web3Context from "../../../utils/web3/context/web3.context";
import { Button } from "antd";
import { profileRouteBuilder } from "../../../utils/profile/routing.utils";
import { ProfileContextInterface } from "../../../schema/profile/profile.interface";
import { FixLater } from "../../../schema/helper.interface";
import ProfileCard from "../../../components/ProfileCard";

const PersonalProfile: FC = (props) => {
    const history = useHistory();
    const userContext: ProfileContextInterface = useContext(UserContext); // load profile info from provider
    const web3Context: FixLater = useContext(Web3Context);

    const profile = userContext.profile;

    const connectWallet = (): void => {
        history.push(startRoute);
    }

    const createProfile = (): void => {
        history.push(createProfileRoute);
    }

    // to update profile
    const updateProfile = () : void => {
        let pathname: string = profileRouteBuilder(
            profile.network,
            profile.profileID,
        )
        history.push({pathname: pathname});
    }
    
    return (
        <ProfileCard.Full
            profile={profile}
        />
    )
}

export default PersonalProfile;