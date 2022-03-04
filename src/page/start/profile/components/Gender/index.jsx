import CustomTypography from '../../../../../components/Typography';
import { useContext, useEffect } from 'react';
import Toggler from '../../../../../components/Toggler';
import ProfileContext from '../../../context/socialApp/profile.context';
import { Col, Grid, Input, Row, Space, Typography } from 'antd';
import CreateProfileContext from '../../../context/profile/profile.context';

const ProfileGender = (props) => {

    const { profile, updateDataByKey } = useContext(ProfileContext);
    const { setNextDisabled } = useContext(CreateProfileContext);

    const genderOpts = [ { value: 'male', label: 'Male' }, { value: 'female', label: 'Female' } ];

    useEffect(() => {
        if (!profile.gender || profile.gender == '') {
            setNextDisabled(true);
        } else {
            setNextDisabled(false);
        }
    }, [profile.gender])

    const toggleGender = (val) => {
        updateDataByKey('gender', val);
    };

    return (
        <div id="RD-CreateProfile-height" className="RD-CreateProfileComponents">
            <Row>
                <Col span={24}>
                    <Space direction='vertical' style={{width: '100%'}}>
                        <CustomTypography.Featured alignment="left">Dating Preference</CustomTypography.Featured>
                        <Typography.Title level={1}>You defined yourself as</Typography.Title>
                        <div className="mt-10 inline-flex items-end">
                            <div className="mr-5">
                                <Toggler value={profile.gender} opts={genderOpts} handleToggle={toggleGender} />
                            </div>
                        </div>
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default ProfileGender;
