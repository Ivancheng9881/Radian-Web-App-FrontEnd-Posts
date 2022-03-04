import CustomTypography from '../../../../../components/Typography';
import { useContext, useEffect, useState } from 'react';
import CreateProfileContext from '../../../context/profile/profile.context';
import ProfileContext from '../../../context/datingApp/dating.context';
import Toggler from '../../../../../components/Toggler';
import { Col, Grid, Input, Row, Slider, Space, Typography } from 'antd';

const DatingAgeRange = () => {

    const ageMinDefault = 18;
    const ageMaxDefault = 100;

    const { profile, updateMultiple, updateDataByKey } = useContext(ProfileContext);
    const { setNextDisabled } = useContext(CreateProfileContext);

    useEffect(() => {

        if (!profile.ageRangeMin) {
            updateDataByKey('ageRangeMin', ageMinDefault);
        }
        if (!profile.ageRangeMax) {
            updateDataByKey('ageRangeMax', ageMaxDefault);
        };        
    }, []);

    const dealBreakerOpts = [ { value: 1, label: 'yes' }, { value: 0, label: 'no' } ];

    const handleToggle = (val) => updateDataByKey('ageRangeIsDealBreaker', val);
   
    const handleAfterChange = (e) => {
        updateMultiple({'ageRangeMax': e[1], 'ageRangeMin': e[0]});
    }

    return (
        <div id="RD-CreateProfile-height" className="RD-CreateProfileComponents">
            <Row>
                <Col span={24}>
                    <Space direction='vertical' style={{width: '100%'}}>
                        <CustomTypography.Featured alignment="left">Dating Preference</CustomTypography.Featured>
                        <Typography.Title level={1} alignment="left">Age Range</Typography.Title>
                        <Row>
                            <Col span={24} >
                                <Slider 
                                    min={18}
                                    max={100}
                                    defaultValue={[profile.ageRangeMin, profile.ageRangeMax]}
                                    onAfterChange={handleAfterChange}
                                    step={1}
                                    range
                                    tooltipVisible
                                />
                            </Col>
                            <Col span={24} >
                                <div className="mt-10 inline-flex items-end">
                                    <div className="mr-5">
                                        <Toggler
                                            value={profile.ageRangeIsDealBreaker}
                                            opts={dealBreakerOpts}
                                            handleToggle={handleToggle}
                                            size="large"
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default DatingAgeRange;
