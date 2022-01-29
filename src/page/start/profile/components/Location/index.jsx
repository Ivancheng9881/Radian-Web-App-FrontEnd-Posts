import Typography from '../../../../../components/Typography';
import TextField from '../../../../../components/Textfield';
import { useContext, useState } from 'react';
import CreateProfileContext from '../../../context/profile/profile.context';

const ProfileLocation = (props) => {
    const { profile, updateProfile } = useContext(CreateProfileContext);

    const [ data, setData ] = useState({
        firstName: '',
        lastName: ''
    });

    const handleChange = (e) => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div id="RD-CreateProfile-location" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Basic Info</Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2 alignment="left">Your Location</Typography.H2>
            </div>
            <div className="mt-10 inline-flex">
                <div className="w-2/3 mr-5">
                    <TextField.Outlined
                        type="text"
                        name="location"
                        placeholder="location"
                        value={profile.location}
                        onChange={updateProfile}
                    />
                </div>
            </div>
            {profile.error ? <p className="text-theme-danger">{profile.error}</p> : ''}
        </div>
    );
};

export default ProfileLocation;
