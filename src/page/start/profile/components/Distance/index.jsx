import CustomTypography from '../../../../../components/Typography';
import { useContext, useEffect } from 'react';
import CreateProfileContext from '../../../context/profile/profile.context';
import ProfileContext from '../../../context/datingApp/dating.context';
import Toggler from '../../../../../components/Toggler';
import { Col, Grid, Input, Row, Slider, Space, Typography } from 'antd';

const DatingDistance = () => {

    const dealBreakerOpts = [ { value: 1, label: 'yes' }, { value: 0, label: 'no' } ];

    const { profile, updateDataByKey } = useContext(ProfileContext);
    const { setNextDisabled } = useContext(CreateProfileContext);

    useEffect(() => {
        if (!profile.distanceIsDealBreaker || profile.distanceIsDealBreaker == '') {
            setNextDisabled(true);
        } else {
            setNextDisabled(false);
        }
    }, [profile.distanceIsDealBreaker]);

    const handleToggle = (val) => updateDataByKey('distanceIsDealBreaker', val);

    const handleMaxChange = (val) => updateDataByKey('distanceMax', val);

    return (
        <div id="RD-CreateProfile-height" className="RD-CreateProfileComponents">
            <Row>
                <Col span={24}>
                    <Space direction='vertical' style={{width: '100%'}}>
                        <CustomTypography.Featured alignment="left">Dating Preference</CustomTypography.Featured>
                        <Typography.Title level={1} alignment="left">Maximum Distance (mi)</Typography.Title>
                        <Row>
                            <Col span={24} >
                                <Slider
                                    defaultValue={profile.distanceMax}
                                    max={100}
                                    min={0}
                                    onAfterChange={handleMaxChange}
                                    tooltipVisible
                                />
                            </Col>
                            <Col span={24} >
                                <div className="mt-10 inline-flex items-end">
                                    <div className="mr-5">
                                        <Toggler
                                            value={profile.distanceIsDealBreaker}
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

export default DatingDistance;
