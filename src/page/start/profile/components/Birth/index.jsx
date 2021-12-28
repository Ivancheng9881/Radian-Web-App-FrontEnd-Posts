import Typography from "../../../../../components/Typography";
import TextField from "../../../../../components/Textfield";
import { useContext } from "react";
import CreateProfileContext from "../../context/profile.context";

const ProfileBirth = (props) => {

    const { profile, updateProfile } = useContext(CreateProfileContext);

    return (
        <div id="RD-CreateProfile-dob" className="RD-CreateProfileComponents">
            <Typography.Featured
                alignment='left'
            >
                Basic Info
            </Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2
                    alignment="left"
                >
                    Birthday is on the
                </Typography.H2>
            </div>
            <div className="mt-10 inline-flex">
                <div className="w-48 mr-5">
                    <TextField.Outlined
                        name='day'
                        placeholder="DD"
                        value={profile.day}
                        onChange={updateProfile}
                    />
                </div>
                <div className="w-48 mr-5">
                    <TextField.Outlined
                        name='month'
                        placeholder="MM"
                        value={profile.month}
                        onChange={updateProfile}
                    />
                </div>
                <div className="w-48 mr-5">
                    <TextField.Outlined
                        name='year'
                        placeholder="YYYY"
                        value={profile.year}
                        onChange={updateProfile}
                    />
                </div>
            </div>
        </div>
    )
};


export default ProfileBirth;