import { useContext, useState } from 'react';
import Dropdown from 'react-dropdown';
import Typography from '../../../../../components/Typography';
import TextField from '../../../../../components/Textfield';

import CreateProfileContext from '../../../context/profile/profile.context';

import 'react-dropdown/style.css';
import './selectCountryCode.styles.css';

import { country_code_list as countryCodeOptions } from './countryCode.json';

const ProfilePhone = (props) => {
    const { profile, updateProfile, updateProfileByDropdownSelect } = useContext(CreateProfileContext);
    const [ selectedCountryCode, setSelectedCountryCode ] = useState(`Select Code`);

    const handleChange = async (e) => {
        let eValue = e.value.replace('+', '');

        setSelectedCountryCode(e.value);

        //update profile state
        updateProfileByDropdownSelect('countryCode', eValue);
    };

    return (
        <div id="RD-CreateProfile-phone" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Basic Info</Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2 alignment="left">You can reach me at</Typography.H2>
            </div>
            <div className="mt-10 inline-flex">
                <div className="max-w-none w-60 mr-5" id="RD-SelectCountryCode">
                    <Dropdown
                        options={countryCodeOptions.sort()}
                        value={selectedCountryCode ? selectedCountryCode : `+${profile.countryCode}`}
                        onChange={handleChange}
                        placeholder={selectedCountryCode}
                    />
                </div>
                <div className="max-w-sm mr-5">
                    <TextField.Outlined
                        name="number"
                        type="number"
                        placeholder="000000000"
                        value={profile.number}
                        onChange={(e) => updateProfile(e, 'number')}
                    />
                </div>
            </div>
            {profile.error ? <p className="text-theme-danger">{profile.error}</p> : ''}
        </div>
    );
};

export default ProfilePhone;
