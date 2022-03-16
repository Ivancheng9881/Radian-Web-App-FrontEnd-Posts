import { useCallback, useContext, useEffect } from 'react';
import ProfilePictureFrame from '../../../../../components/ProfilePictureFrame';
import CustomTypography from '../../../../../components/Typography';
import ipfsUtils from '../../../../../utils/web3/ipfs/ipfs.utils';
import ProfileContext from '../../../context/socialApp/profile.context';
import { Button, Col, Input, Row, Space, Tooltip, Typography } from 'antd';
import CheckoutInputField from '../InfoDisplay/inputField.components';

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

const CheckoutIdentityInformation = () => {

    const { profile, visible, setVisible } = useContext(ProfileContext);

    useEffect(()=>{
        window.scrollTo({ top: 40, behavior: 'instant' });
    },[])

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
                            fieldName='firstName'
                            label='First name'
                            onClick={toggleVisibility}
                        />
                        <CheckoutInputField 
                            visible={visible}
                            data={profile}
                            fieldName='lastName'
                            label='Last name'
                            onClick={toggleVisibility}
                        />
                        <CheckoutInputField 
                            visible={visible}
                            data={profile}
                            fieldName='dob'
                            label='Birthday'
                            value={(profile.day || profile.month || profile.year) && `${profile.day}/${profile.month}/${profile.year}`}
                            onClick={toggleVisibility}
                        />
                        <CheckoutInputField 
                            visible={visible}
                            data={profile}
                            fieldName='gender'
                            label='Gender'
                            onClick={toggleVisibility}
                        />
                        <CheckoutInputField 
                            visible={visible}
                            data={profile}
                            fieldName='phoneNumber'
                            label='Phone Number'
                            value={`${profile.countryCode} ${profile.number}`}
                            onClick={toggleVisibility}
                        />
                        <CheckoutInputField 
                            visible={visible}
                            data={profile}
                            fieldName='nationality'
                            label='Nationality'
                            onClick={toggleVisibility}
                        />
                        <CheckoutInputField 
                            visible={visible}
                            data={profile}
                            fieldName='interest'
                            label='Interest'
                            value={profile.interest?.join(', ')}
                            onClick={toggleVisibility}
                        />
                    </Space>
                </Col>
                <Col span={6}>
                    <div className="text-2xl mb-4 text-theme-white font-semibold text-center md:text-left">Profile Images</div>
                    <div className='flex flex-wrap gap-5 justify-center md:justify-start'>
                        { (typeof profile.profilePictureCid === 'string') ? 
                            <ProfilePictureFrame
                            key="profilePictureCid"
                            src={profile.profilePictureCid} />
                            :
                            profile.profilePictureCid.map((k,v) => {
                                return <ProfilePictureFrame
                                    key={`profilePictureCid_${v}`}
                                    src={k} 
                                />    
                            })
                        }
                        
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default CheckoutIdentityInformation;
