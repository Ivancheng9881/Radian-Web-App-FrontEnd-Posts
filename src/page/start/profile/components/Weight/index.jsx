import Typography from "../../../../../components/Typography";
import TextField from "../../../../../components/Textfield";
import { useContext } from "react";
import Toggler from "../../../../../components/Toggler";
import CreateProfileContext from "../../../context/profile.context";

const ProfileWeight = (props) => {

    const { profile, updateProfile } = useContext(CreateProfileContext);

    const unitOpts = [
        { value: 'lbs', label: 'lbs' },
        { value: 'kg', label: 'kg' }
    ]

    const toggleUnit = (val) => {
        let update = { target: {
            name: 'weightUnit',
            value: val
        }}
        updateProfile(update);
    }

    return (
        <div id="RD-CreateProfile-weight" className="RD-CreateProfileComponents">
            <Typography.Featured
                alignment='left'
            >
                Basic Info
            </Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2
                    alignment="left"
                >
                    Weight
                </Typography.H2>
            </div>
            <div className="mt-10 inline-flex items-end">
                <div className="w-1/3 mr-5">
                    <TextField.Outlined
                        name='weight'
                        placeholder={profile.weightUnit.toUpperCase()}
                        value={profile.weight}
                        onChange={updateProfile}
                    />
                </div>
                <div className="max-w-sm mr-5">
                    <Toggler 
                        value={profile.weightUnit}
                        opts={unitOpts}
                        handleToggle={toggleUnit}
                    />
                </div>
            </div>
        </div>
    )
};


export default ProfileWeight;