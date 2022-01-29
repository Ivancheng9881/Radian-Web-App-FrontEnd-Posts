import Typography from '../../../../../components/Typography';
import TextField from '../../../../../components/Textfield';
import { useContext, useState } from 'react';
import CreateProfileContext from '../../../context/profile/profile.context';

const ProfileNationality = (props) => {
    const { profile, updateProfile } = useContext(CreateProfileContext);

    const [ data, setData ] = useState({
        selected: ''
    });

    const handleChange = (e) => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div id="RD-CreateProfile-nationality" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Basic Info</Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2 alignment="left">Nationality</Typography.H2>
            </div>
            <div className="mt-10 inline-flex">
                <div className="w-1/2 mr-5">
                    <TextField.Outlined
                        type="text"
                        name="nationality"
                        placeholder="Nationality"
                        value={profile.nationality}
                        onChange={updateProfile}
                    />
                </div>
            </div>
            {profile.error ? <p className="text-theme-danger">{profile.error}</p> : ''}
        </div>
    );
};

export default ProfileNationality;
