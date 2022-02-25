import { useContext, useState } from 'react';
import ProfileContext from '../../../../../utils/profile/context/profile.context';
import { Col, Grid, Input, Row, Space, Typography } from 'antd';
import CustomTypography from '../../../../../components/Typography';

const ProfileLocation = (props) => {

    const { getLatestField, updatedData, updateData } = useContext(ProfileContext);
    
    let location = getLatestField('location');

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
                                    value={location}
                                    onChange={updateData}
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
