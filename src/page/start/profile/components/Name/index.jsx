import Typography from '../../../../../components/Typography';
import TextField from '../../../../../components/Textfield';
import { useContext} from 'react';
import ProfileContext from '../../../../../utils/profile/context/profile.context';

const ProfileName = (props) => {

    const { getLatestField, updatedData, updateDataByKey } = useContext(ProfileContext);

    const firstName = getLatestField('firstName');
    const lastNameDefault = getLatestField('lastName');

    const handleChange = (e) => {
        let key;
        switch (e.target.name) {
            case 'radianFirstName':
                key = 'firstName';
                break;
            case 'radianLastName':
                key = 'lastName';
                break;
        }
        updateDataByKey(key, e.target.value, 'text');
    };

    return (
        <div id="RD-CreateProfile-name" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Create your RADIAN passport</Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2 alignment="left">My name is</Typography.H2>
            </div>

            <div className="mt-10 inline-flex">
                <div className="max-w-sm mr-5">
                    <TextField.Outlined
                        name="radianFirstName"
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="max-w-sm mr-5">
                    <TextField.Outlined
                        name="radianLastName"
                        type="text"
                        placeholder="Last Name"
                        value={lastNameDefault}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* {updatedData.error ? <p className="text-theme-danger">{updatedData.error}</p> : ''} */}
        </div>
    );
};

export default ProfileName;
