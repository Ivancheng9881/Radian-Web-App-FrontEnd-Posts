import Typography from '../../../../../components/Typography';
import TextField from '../../../../../components/Textfield';
import { useContext, useState } from 'react';
import Toggler from '../../../../../components/Toggler';
import DatingContext from '../../../context/datingApp/dating.context';
import { Input } from 'antd';

const ProfileHeight = (props) => {
    
    const { getLatestField, datingInfo, updateData } = useContext(DatingContext);

    const height = getLatestField('height');
    let heightUnit = getLatestField('heightUnit');
    if (heightUnit == null || heightUnit == ""){
        heightUnit = "cm";
    }

    const unitOpts = [ { value: 'cm', label: 'cm' }, { value: 'inch', label: 'inch' } ];

    const toggleUnit = (val) => {
        let update = {
            target: {
                name: 'heightUnit',
                value: val
            }
        };
        updateData(update, 'number');
    };

    return (
        <div id="RD-CreateProfile-height" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Basic Info</Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2 alignment="left">Height</Typography.H2>
            </div>
            <div className="mt-10 inline-flex flex-wrap items-end">
                <div className="w-48 mr-5">
                    <Input
                        size='large'
                        type="number"
                        name="height"
                        placeholder={heightUnit.toUpperCase()}
                        value={height}
                        onChange={(e) => updateData(e, 'number')}
                    />
                </div>
                <div className="mr-5 mt-3 z-10">
                    <Toggler value={heightUnit} opts={unitOpts} handleToggle={toggleUnit} />
                </div>
            </div>
            {/* {datingInfo.error ? <p className="text-theme-danger">{datingInfo.error}</p> : ''} */}
        </div>
    );
};

export default ProfileHeight;
