import { FC, useContext, useEffect, useState } from "react";
import UserContext from "../../../utils/user/context/user.context";
import { FullProfile } from "../../../schema/profile/profile.interface";
import EditProfileForm from "./form";

const ProfileSettings: FC = () => {

    const userContext = useContext(UserContext);

    const [ profile, setProfile ] = useState<FullProfile>(userContext.profile);

    useEffect(() => {
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