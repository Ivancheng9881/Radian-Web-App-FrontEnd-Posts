import Typography from '../../../../../components/Typography';
import TextField from '../../../../../components/Textfield';
import { useContext } from 'react';
import CreateProfileContext from '../../../context/profile/profile.context';
import Validator from '../../../../../utils/validation';

const ProfileBirth = (props) => {
    const { profile, updateProfile } = useContext(CreateProfileContext);

    // console.log('ProfileBirth', profile);
    const handleDayUpdate = (e) => {
        let isValid = Validator.isNumberInRange(e.target.value, 0, 31, true);
        if (isValid) updateProfile(e);
    };

    const handleMonthUpdate = (e) => {
        let isValid = Validator.isNumberInRange(e.target.value, 0, 12, true);
        if (isValid) updateProfile(e);
    };

    const handleYearUpdate = (e) => {
        let isValid = Validator.isNumberInRange(e.target.value, 0, 2100, true);
        if (isValid) updateProfile(e);
    };

    return (
        <div id="RD-CreateProfile-dob" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Basic Info</Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2 alignment="left">Birthday is on the</Typography.H2>
            </div>
            <div className="mt-10 inline-flex">
                <div className="w-48 mr-5">
                    <TextField.Outlined
                        type="number"
                        name="day"
                        placeholder="DD"
                        value={profile.day}
                        onChange={handleDayUpdate}
                    />
                </div>
                <div className="w-48 mr-5">
                    <TextField.Outlined
                        type="number"
                        name="month"
                        placeholder="MM"
                        value={profile.month}
                        onChange={handleMonthUpdate}
                    />
                </div>
                <div className="w-48 mr-5">
                    <TextField.Outlined
                        type="number"
                        name="year"
                        placeholder="YYYY"
                        value={profile.year}
                        onChange={handleYearUpdate}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfileBirth;
