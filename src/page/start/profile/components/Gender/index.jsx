import CustomTypography from '../../../../../components/Typography';
import { useContext } from 'react';
import Toggler from '../../../../../components/Toggler';
import ProfileContext from '../../../../../utils/profile/context/profile.context';
import { Col, Grid, Input, Row, Space, Typography } from 'antd';

const ProfileGender = (props) => {

    const { getLatestField, updateData } = useContext(ProfileContext);

    const gender = getLatestField('gender');

    const genderOpts = [ { value: 'male', label: 'Male' }, { value: 'female', label: 'Female' } ];

    const toggleGender = (val) => {
        let update = {
            target: {
                name: 'gender',
                value: val
            }
        };
        updateData(update);
    };

    return (
        <div id="RD-CreateProfile-height" className="RD-CreateProfileComponents">
            <Row>
                <Col span={24}>
                    <Space direction='vertical' style={{width: '100%'}}>
                        <CustomTypography.Featured alignment="left">Dating Preference</CustomTypography.Featured>
                        <Typography.Title level={1} alignment="left">You defined yourself as</Typography.Title>
                        <div className="mt-10 inline-flex items-end">
                            <div className="mr-5">
                                <Toggler value={gender} opts={genderOpts} handleToggle={toggleGender} />
                            </div>
                        </div>
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default ProfileGender;
