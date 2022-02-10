import Typography from '../../../../../components/Typography';
import { useContext } from 'react';
import Toggler from '../../../../../components/Toggler';
import ProfileContext from '../../../../../utils/profile/context/profile.context';

const ProfileGender = (props) => {

    const { getLatestField, updateData } = useContext(ProfileContext);

    const gender = getLatestField('gender');

    const genderOpts = [ { value: 'male', label: 'Male' }, { value: 'female', label: 'Female' } ];

    const toggleGender = (val) => {
        let update = {
            target: {
                name: 'gender',
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
                    <div className="pt-4 pb-2 pr-4">
                        <Typography.H2 alignment="left">You defined yourself as</Typography.H2>
                    </div>
                    <div className="mt-10 inline-flex items-end">
                        <div className="mr-5">
                            <Toggler value={gender} opts={genderOpts} handleToggle={toggleGender} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileGender;
