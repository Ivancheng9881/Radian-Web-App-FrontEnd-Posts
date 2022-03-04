import { useContext, useEffect } from 'react';
import ProfilePictureFrame from '../../../../../components/ProfilePictureFrame';
import CustomTypography from '../../../../../components/Typography';
import ipfsUtils from '../../../../../utils/web3/ipfs/ipfs.utils';
import DatingContext from '../../../context/datingApp/dating.context';
import InfoDisplayGroup from '../InfoDisplay/InfoDisplay.components';
import CheckoutInputField from '../InfoDisplay/inputField.components';
import { Button, Col, Input, Row, Space, Tooltip, Typography } from 'antd';
import ProfileContext from '../../../context/datingApp/dating.context';

const styles = {
    space: {
        width: '100%',
    },
    title: {
        textAlign: 'center'
    },
    inputGroup: {
        display: 'flex'
    }
};

const CheckoutDescriptionInformation = () => {

    const { profile, visible, setVisible } = useContext(ProfileContext);

    useEffect(()=>{
        window.scrollTo({ top: 40, behavior: 'instant' });
    },[]);

    const toggleVisibility = (key) => {
        setVisible((prevState) => { return {
            ...visible,
            [key]: {
                ...prevState[key],
                status: !prevState[key].status,
            }
        }})
    }

    return (
        <div>
            <div className="pl-6 pr-6 mb-5">
                <CustomTypography.Featured>RADIAN Passport Summary</CustomTypography.Featured>
            </div>
            <Row gutter={24} >
                <Col span={18} >
                    <Typography.Title level={3} style={styles.title} >
                            Identity Information
                    </Typography.Title>
                    <Space style={styles.space} direction='vertical'>
                        <CheckoutInputField 
                            visible={visible}
                            data={profile}
                            fieldName='weight'
                            label='Weight'
                            value={`${profile.weight} ${profile.weightUnit}`}
                            onClick={toggleVisibility}
                        />
                        <CheckoutInputField 
                            visible={visible}
                            data={profile}
                            fieldName='height'
                            label='Height'
                            value={`${profile.height} ${profile.heightUnit}`}
                            onClick={toggleVisibility}
                        />
                        <CheckoutInputField 
                            visible={visible}
                            data={profile}
                            fieldName='orientation'
                            label='Interested in'
                            onClick={toggleVisibility}
                        />
                        <CheckoutInputField 
                            visible={visible}
                            data={profile}
                            fieldName='lookingFor'
                            label='Looking for'
                            onClick={toggleVisibility}
                        />
                        <CheckoutInputField 
                            visible={visible}
                            data={profile}
                            fieldName='ageRange'
                            label='Age range'
                            value={`${profile.ageRangeMin} - ${profile.ageRangeMax}`}
                            onClick={toggleVisibility}
                        />
                        <CheckoutInputField 
                            visible={visible}
                            data={profile}
                            fieldName='lookingFor'
                            label='Looking for'
                            onClick={toggleVisibility}
                        />
                        <CheckoutInputField 
                            visible={visible}
                            data={profile}
                            fieldName='distance'
                            label='Max distance'
                            value={`${profile.distanceMax} miles`}
                            onClick={toggleVisibility}
                        />
                        <CheckoutInputField 
                            visible={visible}
                            data={profile}
                            fieldName='datingEthnicity'
                            label='Ethnicity'
                            value={profile.datingEthnicity.join(', ')}
                            onClick={toggleVisibility}
                        />
                        <CheckoutInputField 
                            visible={visible}
                            data={profile}
                            fieldName='datingReligion'
                            label='Religion'
                            value={profile.datingReligion.join(', ')}
                            onClick={toggleVisibility}
                        />
                    </Space>
                </Col>
                <Col span={6}>
                </Col>
            </Row>
        </div>
    );
};

export default CheckoutDescriptionInformation;
