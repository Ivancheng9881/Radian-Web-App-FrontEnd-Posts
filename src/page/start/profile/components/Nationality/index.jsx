import CustomTypography from '../../../../../components/Typography';
import TextField from '../../../../../components/Textfield';
import { useContext, useEffect, useState } from 'react';
import ProfileContext from '../../../context/socialApp/profile.context';
import { Col, Grid, Input, Row, Space, Typography } from 'antd';
import CreateProfileContext from '../../../context/profile/profile.context';

const ProfileNationality = (props) => {

    const { profile, updateDataByKey } = useContext(ProfileContext);
    const { setNextDisabled } = useContext(CreateProfileContext);

    useEffect(() => {
        if (!profile.nationality || profile.nationality == '') {
            setNextDisabled(true);
        } else {
            setNextDisabled(false);
        }
    }, [profile.nationality])

    const handleChange = (e) => {
        updateDataByKey('nationality', e.target.value);
    }

    
    return (
        <div id="RD-CreateProfile-nationality" className="RD-CreateProfileComponents">
            <Row>
                <Col span={24}>
                    <Space direction='vertical' style={{width: '100%'}}>
                        <CustomTypography.Featured alignment="left">Basic Info</CustomTypography.Featured>
                        <Typography.Title level={1} alignment="left">Nationality</Typography.Title>
                        <Row gutter={12}>
                            <Col span={24}>
                                <Input
                                    size='large'
                                    type="text"
                                    name="nationality"
                                    placeholder="Nationality"
                                    value={profile.nationality}
                                    onChange={handleChange}
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

export default ProfileNationality;
