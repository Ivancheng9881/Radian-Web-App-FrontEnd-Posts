import { useContext, useEffect } from 'react';
import Toggler from '../../../../../components/Toggler';
import { Col, Grid, Input, Row, Space, Typography } from 'antd';
import CustomTypography from '../../../../../components/Typography';
import CreateProfileContext from '../../../context/profile/profile.context';
import ProfileContext from '../../../context/datingApp/dating.context';

const ProfileWeight = (props) => {

    const { profile, updateDataByKey } = useContext(ProfileContext);
    const { setNextDisabled } = useContext(CreateProfileContext);

    useEffect(() => {
        if (!profile.weight || profile.weight == '') {
            setNextDisabled(true);
        } else {
            setNextDisabled(false);
        }
    }, [profile.weight])

    useEffect(() => {
        if (profile.weightUnit == null || profile.weightUnit == ""){
            updateDataByKey('weightUnit', 'kg')
        }
    }, [])

    const unitOpts = [ { value: 'lbs', label: 'lbs' }, { value: 'kg', label: 'kg' } ];

    const toggleUnit = (val) => {
        updateDataByKey('weightUnit', val);
    };

    const handleWeightChange = (e) => {
        updateDataByKey('weight', e.target.value);
    }

    return (
        <div id="RD-CreateProfile-weight" className="RD-CreateProfileComponents">
            <Row>
                <Col span={24}>
                    <Space direction='vertical' style={{width: '100%'}}>
                        <CustomTypography.Featured alignment="left">Basic Info</CustomTypography.Featured>
                        <Typography.Title level={1} alignment="left">Weight</Typography.Title>
                        <Row gutter={12}>
                            <Col span={6}>
                                <Input
                                    size='large'
                                    type="number"
                                    name="weight"
                                    placeholder={profile.weightUnit?.toUpperCase() || 'kg'}
                                    value={profile.weight}
                                    onChange={handleWeightChange}
                                />
                            </Col>
                            <Col span={12}>
                                <div className="inline-flex items-end">
                                    <div className="mr-5">
                                    <Toggler 
                                        value={profile.weightUnit} 
                                        opts={unitOpts} 
                                        handleToggle={toggleUnit} 
                                    />
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

export default ProfileWeight;
