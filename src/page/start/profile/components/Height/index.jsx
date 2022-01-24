import Typography from '../../../../../components/Typography';
import TextField from '../../../../../components/Textfield';
import { useContext, useState } from 'react';
import Toggler from '../../../../../components/Toggler';
import CreateProfileContext from '../../../context/profile/profile.context';

const ProfileHeight = (props) => {
    const { profile, updateProfile } = useContext(CreateProfileContext);

    const unitOpts = [ { value: 'cm', label: 'cm' }, { value: 'inch', label: 'inch' } ];

    const toggleUnit = (val) => {
        let update = {
            target: {
                name: 'heightUnit',
                value: val
            }
        };
        updateProfile(update);
    };

    return (
        <div id="RD-CreateProfile-height" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Basic Info</Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2 alignment="left">Height</Typography.H2>
            </div>
            <div className="mt-10 inline-flex items-end">
                <div className="w-1/3 mr-5">
                    <TextField.Outlined
                        type="number"
                        name="height"
                        placeholder={profile.heightUnit.toUpperCase()}
                        value={profile.height}
                        onChange={updateProfile}
                    />
                </div>
                <div className="max-w-sm mr-5 z-10">
                    <Toggler value={profile.heightUnit} opts={unitOpts} handleToggle={toggleUnit} />
                </div>
            </div>
        </div>
    );
};

export default ProfileHeight;
