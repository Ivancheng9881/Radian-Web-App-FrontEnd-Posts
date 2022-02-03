import Typography from '../../../../../components/Typography';
import TextField from '../../../../../components/Textfield';
import { useContext, useState } from 'react';
import ProfileContext from '../../../../../utils/profile/context/profile.context';

const ProfileLocation = (props) => {

    const { getLatestField, updatedProfile, updateProfile } = useContext(ProfileContext);
    
    let location = getLatestField('location');

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
                        value={location}
                        onChange={updateProfile}
                    />
                </div>
            </div>
            {updatedProfile?.error ? <p className="text-theme-danger">{updatedProfile?.error}</p> : ''}
        </div>
    );
};

export default ProfileLocation;
