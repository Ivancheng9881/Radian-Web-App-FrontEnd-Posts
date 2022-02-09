import Typography from '../../../../../components/Typography';
import { useContext } from 'react';
import Toggler from '../../../../../components/Toggler';
import DatingContext from '../../../context/datingApp/dating.context';

const DatingSexualOrientation = (props) => {

    const { getLatestField, datingInfo, updateData } = useContext(DatingContext);

    const gender = getLatestField('gender');
    let orientation = getLatestField('orientation');

    const genderOpts = [ { value: 'male', label: 'Male' }, { value: 'female', label: 'Female' } ];

    const orientationOpts = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'both', label: 'Both' }
    ];

    const toggleGender = (val) => {
        let update = {
            target: {
                name: 'gender',
                value: val
            }
        };
        updateData(update);
    };

    const toggleOrientation = (val) => {
        let update = {
            target: {
                name: 'orientation',
                value: val
            }
        };
        updateData(update);
    };

    return (
        <div id="RD-CreateProfile-height" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Dating Preference</Typography.Featured>
            <div className="w-4/5">
                <div className="inline-flex items-end flex-wrap mb-4">
                    <div className="pt-4 pb-2 pr-4 w-140">
                        <Typography.H2 alignment="left">You defined yourself as</Typography.H2>
                    </div>
                    <div className="mt-10 inline-flex items-end">
                        <div className="mr-5">
                            <Toggler value={gender} opts={genderOpts} handleToggle={toggleGender} />
                        </div>
                    </div>
                </div>
                <div className="inline-flex items-end flex-wrap">
                    <div className="pt-4 pb-2 pr-4 w-140">
                        <Typography.H2 alignment="left">You are interested in</Typography.H2>
                    </div>
                    <div className="mt-10 inline-flex items-end">
                        <div className="mr-5">
                            <Toggler
                                value={orientation}
                                opts={orientationOpts}
                                handleToggle={toggleOrientation}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatingSexualOrientation;
