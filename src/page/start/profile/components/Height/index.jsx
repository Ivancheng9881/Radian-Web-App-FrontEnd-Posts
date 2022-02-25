import { useContext, useState } from 'react';
import Toggler from '../../../../../components/Toggler';
import DatingContext from '../../../context/datingApp/dating.context';
import { Col, Grid, Input, Row, Space, Typography } from 'antd';
import CustomTypography from '../../../../../components/Typography';

const ProfileHeight = (props) => {
    
    const { getLatestField, datingInfo, updateData } = useContext(DatingContext);

    const height = getLatestField('height');
    let heightUnit = getLatestField('heightUnit');
    if (heightUnit == null || heightUnit == ""){
        heightUnit = "cm";
    }

    const unitOpts = [ { value: 'cm', label: 'cm' }, { value: 'inch', label: 'inch' } ];

    const toggleUnit = (val) => {
        let update = {
            target: {
                name: 'heightUnit',
                value: val
            }
        };
        updateData(update, 'number');
    };

    return (
        <div id="RD-CreateProfile-height" className="RD-CreateProfileComponents">
            <Row>
                <Col span={24}>
                    <Space direction='vertical' style={{width: '100%'}}>
                    <CustomTypography.Featured alignment="left">Basic Info</CustomTypography.Featured>
                        <Typography.Title level={1} alignment="left">Height</Typography.Title>
                        <Row gutter={12}>
                            <Col span={6}>
                            <Input
                        size='large'
                        type="number"
                        name="height"
                        placeholder={heightUnit.toUpperCase()}
                        value={height}
                        onChange={(e) => updateData(e, 'number')}
                    />

                            </Col>
                            <Col span={12}>
                                <div className="inline-flex items-end">
                                    <div className="mr-5">
                                    <Toggler value={heightUnit} opts={unitOpts} handleToggle={toggleUnit} />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Space>
                </Col>
            </Row>
            {/* {datingInfo.error ? <p className="text-theme-danger">{datingInfo.error}</p> : ''} */}
        </div>
    );
};

export default ProfileHeight;
