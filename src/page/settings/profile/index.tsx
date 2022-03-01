import { Button } from "antd";
import { FC, useContext, useEffect, useState } from "react";
import CustomTypography from "../../../components/Typography";
import InfoDisplayGroup from "../../start/checkout/components/InfoDisplay/InfoDisplay.components";
import UserContext from "../../../utils/user/context/user.context";
import { FullProfile } from "../../../schema/profile/profile.interface";
import ProfilePictureFrame from "../../../components/ProfilePictureFrame";
import ipfsUtils from "../../../utils/web3/ipfs/ipfs.utils";
import EditProfileForm from "./form";

const ProfileSettings: FC = () => {

    const userContext = useContext(UserContext);

    const [ profile, setProfile ] = useState<FullProfile>(userContext.profile);

    useEffect(() => {
        console.log('kayton@debug',userContext)
        if (userContext.profile?.profileID != profile.profileID) {
            setProfile(userContext.profile);
        }
    }, [userContext.profile])


    return (
        <div>
            <EditProfileForm profile={profile} setProfile={setProfile} />
        </div>
    )
};

export default ProfileSettings;