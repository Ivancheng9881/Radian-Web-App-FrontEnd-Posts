import { useContext, useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import CustomTypography from '../../../../../components/Typography';
import TextField from '../../../../../components/Textfield';

import ProfileContext from '../../../../../utils/profile/context/profile.context';

import 'react-dropdown/style.css';
import './selectCountryCode.styles.css';

import { country_code_list as countryCodeOptions } from './countryCode.json';
import { Input, Select, Row, Col, Space, Typography  } from 'antd';

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
            <Row>
                <Col span={24}>
                    <Space direction='vertical' style={{width: '100%'}}>
                        <CustomTypography.Featured alignment="left">Basic Info</CustomTypography.Featured>
                        <Typography.Title level={1} alignment="left">You can reach me at</Typography.Title>
                        <Row gutter={12}>
                            <Col span={6}>
                                <Select
                                    size='large'
                                    value={`+${selectedCountryCode}`}
                                    onChange={handleChange}
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
                            </Col>
                            <Col span={18}>
                                <Input
                                    size='large'
                                    name="number"
                                    type="number"
                                    placeholder="000000000"
                                    value={number}
                                    onChange={(e) => updateData(e, 'number')}
                                />
                            </Col>
                        </Row>
                    </Space>
                </Col>
            </Row>
            {/* {updatedData?.error ? <p className="text-theme-danger">{updatedData?.error}</p> : ''} */}
        </div>
    );
};

export default ProfilePhone;
