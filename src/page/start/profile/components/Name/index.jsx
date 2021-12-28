import Typography from "../../../../../components/Typography";
import TextField from "../../../../../components/Textfield";
import { useContext, useState } from "react";
import CreateProfileContext from "../../context/profile.context";

const ProfileName = (props) => {

    const { profile, updateProfile } = useContext(CreateProfileContext);

    return (
        <div id="RD-CreateProfile-name" className="RD-CreateProfileComponents">
            <Typography.Featured
                alignment='left'
            >
                Create your RADIAN passport
            </Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2
                    alignment="left"
                >
                    My name is
                </Typography.H2>
            </div>
            <div className="mt-10 inline-flex">
                <div className="max-w-sm mr-5">
                    <TextField.Outlined
                        name='firstName'
                        placeholder="Firstname"
                        value={profile.firstName}
                        onChange={updateProfile}
                    />
                </div>
                <div className="max-w-sm mr-5">
                    <TextField.Outlined
                        name='lastName'
                        placeholder="Lastname"
                        value={profile.lastName}
                        onChange={updateProfile}
                    />
                </div>
            </div>
        </div>
    )
};


export default ProfileName;