import Typography from '../../../../../components/Typography';
import TextField from '../../../../../components/Textfield';
import { useContext, useState } from 'react';
import ProfileContext from '../../../../../utils/profile/context/profile.context';
import { Input } from 'antd';

const ProfileLocation = (props) => {

    const { getLatestField, updatedData, updateData } = useContext(ProfileContext);
    
    let location = getLatestField('location');

    return (
        <div id="RD-CreateProfile-location" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Basic Info</Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2 alignment="left">Your Location</Typography.H2>
            </div>
            <div className="mt-10">
                <div className="w-2/3 mr-5">
                    <Input
                        size='large'
                        type="text"
                        name="location"
                        placeholder="location"
                        value={location}
                        onChange={updateData}
                    />
                </div>
            </div>
            {/* {updatedData?.error ? <p className="text-theme-danger">{updatedData?.error}</p> : ''} */}
        </div>
    );
};

export default ProfileLocation;
