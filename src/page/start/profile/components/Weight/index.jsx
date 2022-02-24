import Typography from '../../../../../components/Typography';
import TextField from '../../../../../components/Textfield';
import { useContext } from 'react';
import Toggler from '../../../../../components/Toggler';
import DatingContext from '../../../context/datingApp/dating.context';
import { Input } from 'antd';

const ProfileWeight = (props) => {

    const { getLatestField, datingInfo, updateData } = useContext(DatingContext);

    const weight = getLatestField('weight');
    let weightUnit = getLatestField('weightUnit');
    if (weightUnit == null || weightUnit == ""){
        weightUnit = "kg";
    }

    const unitOpts = [ { value: 'lbs', label: 'lbs' }, { value: 'kg', label: 'kg' } ];

    const toggleUnit = (val) => {
        let update = {
            target: {
                name: 'weightUnit',
                value: val
            }
        };
        updateData(update, 'number');
    };

    return (
        <div id="RD-CreateProfile-weight" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Basic Info</Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2 alignment="left">Weight</Typography.H2>
            </div>
            <div className="mt-10 inline-flex items-end flex-wrap">
                <div className="w-48 mr-5">
                    <Input
                        size='large'
                        type="number"
                        name="weight"
                        placeholder={weightUnit.toUpperCase()}
                        value={weight}
                        onChange={(e) => updateData(e, 'number')}
                    />
                </div>
                <div className="mr-5 mt-3 z-10">
                    <Toggler value={weightUnit} opts={unitOpts} handleToggle={toggleUnit} />
                </div>
            </div>
            {/* {datingInfo.error ? <p className="text-theme-danger">{datingInfo.error}</p> : ''} */}
        </div>
    );
};

export default ProfileWeight;
