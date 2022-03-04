import CustomTypepography from '../../../../../components/Typography';
import TextField from '../../../../../components/Textfield';
import { useContext, useEffect, useState } from 'react';
import Validator from '../../../../../utils/validation';
import ProfileContext from '../../../context/socialApp/profile.context';
import CreateProfileContext from '../../../context/profile/profile.context';

import { Col, Grid, Input, Row, Space, Typography } from 'antd';

const ProfileBirth = (props) => {
    const { profile, updateDataByKey } = useContext(ProfileContext);
    const { setNextDisabled } = useContext(CreateProfileContext);

    const [ error, setError ] = useState({
        day: {
            status: false,
            msg: 'invalid value',
        },
        month:{
            status: false,
            msg: 'invalid value',
        },
        year: {
            status: false,
            msg: 'invalid value',
        },        
    });

    useEffect(() => {
        setNextDisabled((error.year.status || error.month.status || error.day.status));
    }, [error.year, error.month, error.day]);

    useEffect(() => {
        let dayValid = validateDay(profile.day);
        let monthValid = validateMonth(profile.month);
        let yearValid = validateYear(profile.year);
        setError({
            day: {
                status: !dayValid,
                msg: error.day.msg
            },
            month: {
                status: !monthValid,
                msg: error.month.msg
            },
            year: {
                status: !yearValid,
                msg: error.year.msg
            },
        })
    }, []);

    const validateDay = (val) => {
        return Validator.isNumberInRange(val, 0, 31, true)
    };

    const validateMonth = (val) => {
        return Validator.isNumberInRange(val, 0, 12, true);
    };

    const validateYear = (val) => {
        return Validator.isNumberInRange(val, 0, 2100, true);
    }

    // console.log('ProfileBirth', profile);
    const handleDayUpdate = (e) => {
        let isValid = validateDay(e.target.value);
        if (!isValid){
            setError({
                ...error,
                day: {
                    status: true,
                    msg: 'Day is not valid'
                }
            })
        } else {
            setError({
                ...error,
                day: {
                    status: false,
                    msg: error.day.msg
                }
            })
        }
        updateDataByKey('day', e.target.value);

    };

    const handleMonthUpdate = (e) => {
        let isValid = validateMonth(e.target.value)
        if (!isValid){
            setError({
                ...error,
                month: {
                    status: true,
                    msg: 'Month is not valid'
                }
            })
        } else {
            setError({
                ...error,
                month: {
                    status: false,
                    msg: error.month.msg
                }
            })
        }
        updateDataByKey('month', e.target.value);

    };

    const handleYearUpdate = (e) => {
        let isValid = validateYear(e.target.value)
        if (!isValid){
            setError({
                ...error,
                year: {
                    status: true,
                    msg: 'Year is not valid'
                }
            })
        } else {
            setError({
                ...error,
                year: {
                    status: false,
                    msg: error.year.msg
                }
            })
        }
        updateDataByKey('year', e.target.value);

    };

    return (
        <div id="RD-CreateProfile-dob" className="RD-CreateProfileComponents">
            <Row>
                <Col span={24}>
                    <Space direction='vertical' style={{width: '100%'}}>
                        <CustomTypepography.Featured alignment="left">Basic Info</CustomTypepography.Featured>
                        <Typography.Title level={1} alignment="left">Birthday is on the</Typography.Title>
                        <Row gutter={12}>
                            <Col span={8}>
                                <Input
                                    size='large'
                                    type="day"
                                    name="day"
                                    placeholder="DD"
                                    value={profile.day}
                                    onChange={handleDayUpdate}
                                />
                                <Typography.Text type='danger'>
                                    {error.day.status && error.day.msg}
                                </Typography.Text>
                            </Col>
                            <Col span={8}>
                                <Input
                                    size='large'
                                    type="number"
                                    name="month"
                                    placeholder="MM"
                                    value={profile.month}
                                    onChange={handleMonthUpdate}
                                />
                                <Typography.Text type='danger'>
                                    {error.month.status && error.month.msg}
                                </Typography.Text>
                            </Col>
                            <Col span={8}>
                                <Input
                                    size='large'
                                    type="number"
                                    name="year"
                                    placeholder="YYYY"
                                    value={profile.year}
                                    onChange={handleYearUpdate}
                                />
                                <Typography.Text type='danger'>
                                    {error.year.status && error.year.msg}
                                </Typography.Text>
                            </Col>
                        </Row>
                    </Space>
                </Col>
            </Row>

            {/* <Typography.Featured alignment="left">Basic Info</Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2 alignment="left">Birthday is on the</Typography.H2>
            </div>
            <div className="mt-10 mb-2 inline-flex flex-wrap gap-4">
                <div className="w-48 mr-5 overflow-hidden">
                    <Input
                        size='large'
                        className="RD-dob"
                        type="day"
                        name="day"
                        placeholder="DD"
                        value={day}
                        onChange={handleDayUpdate}
                    />
                </div>
                <div className="w-48 mr-5 overflow-hidden">
                    <Input
                        size='large'
                        className="RD-dob"
                        type="number"
                        name="month"
                        placeholder="MM"
                        value={month}
                        onChange={handleMonthUpdate}
                    />
                </div>
                <div className="w-48 mr-5 overflow-hidden">
                    <Input
                        size='large'
                        className="RD-dob"
                        type="number"
                        name="year"
                        placeholder="YYYY"
                        value={year}
                        onChange={handleYearUpdate}
                    />
                </div>
            </div> */}
            {/* {updatedData?.error ? <p className="text-theme-danger">{updatedData?.error}</p> : ''} */}
            <p className="mt-2 font-semi text-theme-lightGray">
                e.g. If your birthday is 1 October 2000, the input format will be 01/10/2000 (DD MM YYYY).
            </p>
        </div>
    );
};

export default ProfileBirth;
