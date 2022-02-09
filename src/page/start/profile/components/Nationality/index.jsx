import Typography from '../../../../../components/Typography';
import TextField from '../../../../../components/Textfield';
import { useContext, useEffect, useState } from 'react';
import ProfileContext from '../../../../../utils/profile/context/profile.context';

const ProfileNationality = (props) => {

    const { getLatestField, updatedData, updateData } = useContext(ProfileContext);

    let nationality = getLatestField('nationality');

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
                        value={nationality}
                        onChange={updateData}
                    />
                </div>
            </div>
            {/* {updatedData?.error ? <p className="text-theme-danger">{updatedData?.error}</p> : ''} */}
        </div>
    );
};

export default ProfileNationality;
