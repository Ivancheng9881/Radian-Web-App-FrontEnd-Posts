import TextField from '../../../../../components/Textfield';
import { useContext} from 'react';
import ProfileContext from '../../../context/socialApp/profile.context';
import { Col, Grid, Input, Row, Space, Typography } from 'antd';
import CustomTypography from '../../../../../components/Typography';

const ProfileName = (props) => {

    const {profile, updateDataByKey} = useContext(ProfileContext);

    const handleChange = (e) => {
        let key;
        switch (e.target.name) {
            case 'radianFirstName':
                key = 'firstName';
                break;
            case 'radianLastName':
                key = 'lastName';
                break;
        }
        updateDataByKey(key, e.target.value);
    };
    
    return (
        <div id="RD-CreateProfile-name">
            <Row>
                <Col span={24}>
                    <Space direction='vertical' style={{width: '100%'}}>
                        <CustomTypography.Featured alignment="left">Create your RADIAN passport</CustomTypography.Featured>
                        <Typography.Title level={1} alignment="left">My name is</Typography.Title>
                        <Row gutter={12}>
                            <Col span={12}>
                                <Input
                                    size='large'
                                    name="radianFirstName"
                                    type="text"
                                    placeholder="First Name"
                                    value={profile.firstName}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col span={12}>
                                <Input
                                    size='large'
                                    name="radianLastName"
                                    type="text"
                                    placeholder="Last Name"
                                    value={profile.lastName}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                    </Space>
                </Col>
            </Row>
            {/* {updatedData.error ? <p className="text-theme-danger">{updatedData.error}</p> : ''} */}
        </div>
    );
};

export default ProfileName;
