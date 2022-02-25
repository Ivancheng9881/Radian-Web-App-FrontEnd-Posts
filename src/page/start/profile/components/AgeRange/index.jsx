import CustomTypography from '../../../../../components/Typography';
import { useContext } from 'react';
import DatingContext from '../../../context/datingApp/dating.context';
import Toggler from '../../../../../components/Toggler';
import ProfileContext from '../../../../../utils/profile/context/profile.context';
import { Col, Grid, Input, Row, Slider, Space, Typography } from 'antd';

const DatingAgeRange = (props) => {
    const { getLatestField, updateDataByKey } = useContext(DatingContext);

    let ageRangeIsDealBreaker = getLatestField("ageRangeIsDealBreaker");
    let ageRangeMin = getLatestField("ageRangeMin");
    let ageRangeMax = getLatestField("ageRangeMax");
    if ( !ageRangeMin ) ageRangeMin = 18;
    if ( !ageRangeMin ) ageRangeMax = 100;
    if ( ! ageRangeIsDealBreaker ) ageRangeIsDealBreaker = 0;

    const dealBreakerOpts = [ { value: 1, label: 'yes' }, { value: 0, label: 'no' } ];

    const handleToggle = (val) => updateDataByKey('ageRangeIsDealBreaker', val);
    const handleAfterChange = (e) => {
        updateDataByKey('ageRangeMax', e[1]);
        updateDataByKey('ageRangeMin', e[0])
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
                                    defaultValue={[ageRangeMin,ageRangeMax]}
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
                                            value={ageRangeIsDealBreaker}
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
