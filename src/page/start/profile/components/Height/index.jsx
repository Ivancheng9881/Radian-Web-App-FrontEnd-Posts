import { useContext, useEffect } from 'react';
import Toggler from '../../../../../components/Toggler';
import { Col, Grid, Input, Row, Space, Typography } from 'antd';
import CustomTypography from '../../../../../components/Typography';
import ProfileContext from '../../../context/datingApp/dating.context';
import CreateProfileContext from '../../../context/profile/profile.context';

const ProfileHeight = () => {

    const defaultUnit = 'cm';
    
    const { profile, updateDataByKey } = useContext(ProfileContext);
    const { setNextDisabled } = useContext(CreateProfileContext);

    useEffect(() => {
        if (!profile.height || profile.height == '') {
            setNextDisabled(true);
        } else {
            setNextDisabled(false);
        }
    }, [profile.height]);

    /**
     * set the initial value of height unit
     */
    useEffect(() => {
        if (profile.heightUnit == null || profile.heightUnit == ""){
            updateDataByKey('heightUnit', defaultUnit)
        }
    }, []);

    const unitOpts = [ { value: 'cm', label: 'cm' }, { value: 'inch', label: 'inch' } ];

    const toggleUnit = (val) => {
        updateDataByKey('heightUnit', val);
    };

    const handleHeightChange = (e) => {
        updateDataByKey('height', e.target.value);
    }

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
                                    placeholder={profile.heightUnit?.toUpperCase() || defaultUnit}
                                    value={profile.height}
                                    onChange={handleHeightChange}
                                />
                            </Col>
                            <Col span={12}>
                                <div className="inline-flex items-end">
                                    <div className="mr-5">
                                    <Toggler 
                                        value={profile.heightUnit} 
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

export default ProfileHeight;
