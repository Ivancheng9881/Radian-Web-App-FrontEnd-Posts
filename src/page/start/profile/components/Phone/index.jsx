import { useContext, useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import Typography from '../../../../../components/Typography';
import TextField from '../../../../../components/Textfield';

import ProfileContext from '../../../../../utils/profile/context/profile.context';

import 'react-dropdown/style.css';
import './selectCountryCode.styles.css';

import { country_code_list as countryCodeOptions } from './countryCode.json';
import { Input, Select } from 'antd';

const ProfilePhone = (props) => {
    const { getLatestField, updatedData, updateData, updateDataByDropdownSelect } = useContext(ProfileContext);

    const [ selectedCountryCode, setSelectedCountryCode ] = useState(`Select Code`);

    const number = getLatestField('number');
    const countryCode = getLatestField('countryCode');
    
    useEffect(()=>{
        if ( countryCode != "" && countryCode != null) {
            setSelectedCountryCode(countryCode);
        }
    })

    const handleChange = async (e) => {
        let eValue = e.value.replace('+', '');

        setSelectedCountryCode(e.value);

        //update profile state
        updateDataByDropdownSelect('countryCode', eValue);
    };

    return (
        <div id="RD-CreateProfile-phone" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Basic Info</Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2 alignment="left">You can reach me at</Typography.H2>
            </div>
            <div className="mt-10 inline-flex flex-wrap">
                <div className="max-w-none w-60 mr-5 mb-10" id="RD-SelectCountryCode">
                    <Select
                        // options={countryCodeOptions.sort()}
                        value={`+${selectedCountryCode}`}
                        onChange={handleChange}
                        // placeholder={selectedCountryCode}
                    >
                        {countryCodeOptions.sort().map((val) => {
                            return (
                                <Select.Option 
                                    key={`countryCode:${val}`} 
                                    value={val} 
                                >
                                    {val}
                                </Select.Option>
                            )
                        })}
                    </Select>
                </div>
                <div className="max-w-sm mr-5">
                    <Input
                        size='large'
                        name="number"
                        type="number"
                        placeholder="000000000"
                        value={number}
                        onChange={(e) => updateData(e, 'number')}
                    />
                </div>
            </div>
            {/* {updatedData?.error ? <p className="text-theme-danger">{updatedData?.error}</p> : ''} */}
        </div>
    );
};

export default ProfilePhone;
