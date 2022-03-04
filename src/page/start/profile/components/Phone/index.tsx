import { FC, useContext, useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import CustomTypography from '../../../../../components/Typography';
import TextField from '../../../../../components/Textfield';

import ProfileContext from '../../../context/socialApp/profile.context';

import 'react-dropdown/style.css';
import './selectCountryCode.styles.css';

import { country_code_list as countryCodeOptions } from './countryCode.json';
import { Input, Select, Row, Col, Space, Typography  } from 'antd';
import { FixLater } from '../../../../../schema/helper.interface';

const styles = {
    select: {
        width: '100%'
    }
} as const;

const ProfilePhone: FC = () => {
    const { profile, setProfile, updateDataByKey } = useContext(ProfileContext);

    // const [ selectedCountryCode, setSelectedCountryCode ] = useState(`Select Code`);

    // const number = getLatestField('number');
    // const countryCode = getLatestField('countryCode');
    
    // useEffect(()=>{
    //     if ( countryCode != "" && countryCode != null) {
    //         setSelectedCountryCode(countryCode);
    //     }
    // })

    const handleChange = async (e: FixLater) => {
        updateDataByKey('countryCode', e);
    };

    const handleNumberUpdate = async (e: FixLater) => {
        updateDataByKey('number', e.target.value);
    }

    return (
        <div id="RD-CreateProfile-phone" className="RD-CreateProfileComponents">
            <Row>
                <Col span={24}>
                    <Space direction='vertical' style={{width: '100%'}}>
                        <CustomTypography.Featured alignment="left">Basic Info</CustomTypography.Featured>
                        <Typography.Title level={1} >You can reach me at</Typography.Title>
                        <Row gutter={12}>
                            <Col span={6}>
                                <Select
                                    size='large'
                                    style={styles.select}
                                    value={profile.countryCode}
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
                                    value={profile.number}
                                    onChange={handleNumberUpdate}
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
