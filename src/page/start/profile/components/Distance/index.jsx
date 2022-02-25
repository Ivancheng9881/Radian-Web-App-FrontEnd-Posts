import CustomTypography from '../../../../../components/Typography';
import { useContext } from 'react';
import DatingContext from '../../../context/datingApp/dating.context';
import Toggler from '../../../../../components/Toggler';
import SingleSlider from '../../../../../components/SingleSlider';
import ProfileContext from '../../../../../utils/profile/context/profile.context';
import { Col, Grid, Input, Row, Slider, Space, Typography } from 'antd';

const DatingDistance = (props) => {
    const { getLatestField, updateDataByKey } = useContext(DatingContext);

    let distanceIsDealBreaker = getLatestField("distanceIsDealBreaker");
    let distanceMax = getLatestField("distanceMax");
    if ( !distanceMax ) distanceMax = 100;
    if ( ! distanceIsDealBreaker ) distanceIsDealBreaker = 0;

    const dealBreakerOpts = [ { value: 1, label: 'yes' }, { value: 0, label: 'no' } ];

    const handleToggle = (val) => updateDataByKey('distanceIsDealBreaker', val);

    const handleMaxChange = (val) => updateDataByKey('distanceMax', val)

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
                                    defaultValue={distanceMax}
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
                                            value={distanceIsDealBreaker}
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
