import Typography from '../../../../../components/Typography';
import TextField from '../../../../../components/Textfield';
import { useContext } from 'react';
import CreateProfileContext from '../../../context/profile/profile.context';
import Validator from '../../../../../utils/validation';

import ProfileContext from '../../../../../utils/profile/context/profile.context';

const ProfileBirth = (props) => {
    const { getLatestField, updatedData, updateData } = useContext(ProfileContext);

    let day = getLatestField('day');
    let month = getLatestField('month');
    let year = getLatestField('year');

    // console.log('ProfileBirth', profile);
    const handleDayUpdate = (e) => {
        let isValid = Validator.isNumberInRange(e.target.value, 0, 31, true);
        console.log('DD', isValid);
        if (isValid){
            updateData(e, 'date', isValid);
        }
    };

    const handleMonthUpdate = (e) => {
        let isValid = Validator.isNumberInRange(e.target.value, 0, 12, true);
        console.log('MM', isValid);
        if (isValid) {
            updateData(e, 'date', isValid);
        }
    };

    const handleYearUpdate = (e) => {
        let isValid = Validator.isNumberInRange(e.target.value, 0, 2100, true);
        console.log('YYYY', isValid);
        if (isValid) {
            updateData(e, 'date', isValid);
        }
    };

    return (
        <div id="RD-CreateProfile-dob" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Basic Info</Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2 alignment="left">Birthday is on the</Typography.H2>
            </div>
            <div className="mt-10 inline-flex">
                <div className="w-48 mr-5 overflow-hidden">
                    <TextField.Outlined
                        className="RD-dob"
                        type="day"
                        name="day"
                        placeholder="DD"
                        value={day}
                        onChange={handleDayUpdate}
                    />
                </div>
                <div className="w-48 mr-5 overflow-hidden">
                    <TextField.Outlined
                        className="RD-dob"
                        type="number"
                        name="month"
                        placeholder="MM"
                        value={month}
                        onChange={handleMonthUpdate}
                    />
                </div>
                <div className="w-48 mr-5 overflow-hidden">
                    <TextField.Outlined
                        className="RD-dob"
                        type="number"
                        name="year"
                        placeholder="YYYY"
                        value={year}
                        onChange={handleYearUpdate}
                    />
                </div>
            </div>
            {updatedData?.error ? <p className="text-theme-danger">{updatedData?.error}</p> : ''}
            <p className="mt-2 font-semi text-theme-lightGray">
                e.g. If your birthday is 1 October 2000, the input format will be 01/10/2000 (DD MM YYYY).
            </p>
        </div>
    );
};

export default ProfileBirth;
