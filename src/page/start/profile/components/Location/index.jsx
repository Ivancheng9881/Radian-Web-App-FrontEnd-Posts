import { useContext, useEffect, useState } from 'react';
import ProfileContext from '../../../context/datingApp/dating.context';
import { Col, Grid, Input, Row, Space, Typography } from 'antd';
import CustomTypography from '../../../../../components/Typography';
import CreateProfileContext from '../../../context/profile/profile.context';

const ProfileLocation = () => {

    const { profile, updateDataByKey } = useContext(ProfileContext);
    const { setNextDisabled } = useContext(CreateProfileContext);

    useEffect(() => {
        if (!profile.location || profile.location == '') {
            setNextDisabled(true);
        } else {
            setNextDisabled(false);
        }
    }, [profile.location])

    const handleChange = (e) => {
        updateDataByKey('location', e.target.value);
    };
    
    return (
        <div id="RD-CreateProfile-location" className="RD-CreateProfileComponents">
            <Row>
                <Col span={24}>
                    <Space direction='vertical' style={{width: '100%'}}>
                        <CustomTypography.Featured alignment="left">Basic Info</CustomTypography.Featured>
                        <Typography.Title level={1} alignment="left">Your Location</Typography.Title>
                        <Row gutter={12}>
                            <Col span={12}>
                                <Input
                                    size='large'
                                    name="radianFirstName"
                                    type="text"
                                    placeholder="Location"
                                    value={profile.location}
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

export default ProfileLocation;
