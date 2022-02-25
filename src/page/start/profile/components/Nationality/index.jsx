import CustomTypography from '../../../../../components/Typography';
import TextField from '../../../../../components/Textfield';
import { useContext, useEffect, useState } from 'react';
import ProfileContext from '../../../../../utils/profile/context/profile.context';
import { Col, Grid, Input, Row, Space, Typography } from 'antd';

const ProfileNationality = (props) => {

    const { getLatestField, updatedData, updateData } = useContext(ProfileContext);

    let nationality = getLatestField('nationality');

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
                                    value={nationality}
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

export default ProfileNationality;
