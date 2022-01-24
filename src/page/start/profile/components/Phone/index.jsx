import Typography from '../../../../../components/Typography';
import TextField from '../../../../../components/Textfield';
import { useContext } from 'react';
import CreateProfileContext from '../../../context/profile/profile.context';

const ProfilePhone = (props) => {
    const { profile, updateProfile } = useContext(CreateProfileContext);

    return (
        <div id="RD-CreateProfile-phone" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Basic Info</Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2 alignment="left">You can reach me at</Typography.H2>
            </div>
            <div className="mt-10 inline-flex">
                <div className="max-w-none w-60 mr-5">
                    <TextField.Outlined
                        name="countryCode"
                        type="number"
                        placeholder="Country Code"
                        value={profile.countryCode}
                        onChange={updateProfile}
                    />
                </div>
                <div className="max-w-sm mr-5">
                    <TextField.Outlined
                        name="number"
                        type="number"
                        placeholder="000000000"
                        value={profile.number}
                        onChange={(e) => updateProfile(e, 'number')}
                    />
                </div>
            </div>
            {profile.error ? <p className="text-theme-danger">{profile.error}</p> : ''}
        </div>
    );
};

export default ProfilePhone;
