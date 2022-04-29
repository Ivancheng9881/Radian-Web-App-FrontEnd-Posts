import { Button, Col, message, Row, Select, Typography } from "antd";
import { FC, useContext, useState } from "react";
import config from '../../../commons/config';
import RadianForm from "../../../components/RadianForm";
import { gender } from "../../../commons/signupOptions";
import { useHistory, useLocation } from "react-router";
import { SIGNUP_PROPIC_ROUTE, SIGNUP_SUMMARY_ROUTE } from "../../../commons/route";
import SignupAction from "../components/signupAction";
import SignupFormWrapper from "../components/signupFormWrapper";
import SignupContext from "../context/signup.context";
import { ISignupContext } from "../type";
import { SignupLocationState } from '../router'


const SignupInfoPage : FC = () => {

    const HORIZONTAL_GUTTER = { md: 44 };
    const TAG_OPTIONS = [
        {label: 'radian passport', value: 'radian passport'}
    ];
    
    // context
    const history = useHistory();
    const location = useLocation<SignupLocationState>();
    const { info, setInfo }: ISignupContext = useContext(SignupContext);

    // state 
    const [ validation, setValidation ] = useState({
        firstName: {
            required: true,
            error: false
        },
        lastName: {
            required: true,
            error: false
        },
        username: {
            required: true,
            error: false
        },
        location: {
            required: true,
            error: false
        },
        religion: {
            required: false,
            error: false
        },
        gender: {
            required: true,
            error: false
        },
        nationality: {
            required: true,
            error: false
        },
        ethnicity: {
            required: true,
            error: false
        },
        tags: {
            required: false,
            error: false
        },
    })

    const validateRequiredField = () : boolean => {
        let validationPassed = true;
        let v: any = {...validation};
        for (const [key, value] of Object.entries(validation)) {
            if (!value.required) {

            } else if (!info[key]) {
                v[key].error = true;
                validationPassed = false;
                message.warning(`${key} is required`)
            } else {
                v[key].error = false;
            }
        }
        setValidation(v);
        return validationPassed;
    }

    const handleNextClick = () => {
        // do data validation
        if (validateRequiredField()) {
            if (location.state?.fromSummary) {
                history.push(SIGNUP_SUMMARY_ROUTE)
            } else {
                history.push(SIGNUP_PROPIC_ROUTE)
            }
        };
    };

    const handleValUpdate = (key: string, value: any) => {
        setInfo({ ...info, [key]: value });
    };

    return (
        <div className="rd-signup-body">
            <div className="rd-signup-illustration">
                <img src={`${config.assets.cdn}/signup/illustration_1_desktop.png`} />
            </div>
            <SignupFormWrapper>
                <div className="rd-signup-form-root">
                    {/* <SignupReturn /> */}
                    <div className="rd-signup-form-body">
                        <div className="rd-signup-form-title">
                            <Typography.Title level={3}>
                                Create RADIAN PASSPORT
                            </Typography.Title>
                        </div>
                        <Row className="rd-signup-row" gutter={[HORIZONTAL_GUTTER, 0]}>
                            <Col lg={8}>
                                <RadianForm.Label 
                                    label="First Name" 
                                    required
                                    isError={validation.firstName.error}
                                >
                                    <RadianForm.Input
                                        id='signup-firstName'
                                        onChange={e => handleValUpdate('firstName', e.target.value)} 
                                        value={info.firstName}    
                                    />
                                </RadianForm.Label>
                            </Col>
                            <Col lg={8}>
                                <RadianForm.Label 
                                    label="Last Name" 
                                    required 
                                    isError={validation.lastName.error}
                                >
                                    <RadianForm.Input 
                                        id='signup-lastName'
                                        onChange={e => handleValUpdate('lastName', e.target.value)} 
                                        value={info.lastName}    
                                    />
                                </RadianForm.Label>
                            </Col>
                            <Col lg={8}>
                                <RadianForm.Label 
                                    label="Username" 
                                    required
                                    isError={validation.username.error}
                                >
                                    <RadianForm.Input 
                                        maxLength={12}
                                        id='signup-username'
                                        onChange={e => handleValUpdate('username', e.target.value)} 
                                        value={info.username}    
                                    />
                                </RadianForm.Label>
                            </Col>
                        </Row>
                        <Row className="rd-signup-row" gutter={[HORIZONTAL_GUTTER, 0]}>
                            <Col lg={8}>
                                <RadianForm.Label 
                                    label="Located in" 
                                    required
                                    isError={validation.location.error}
                                >
                                    <RadianForm.Input 
                                        id='signup-location'
                                        onChange={e => handleValUpdate('location', e.target.value)} 
                                        value={info.location}    
                                    />
                                </RadianForm.Label>
                            </Col>
                            <Col lg={8}>
                                <RadianForm.Label label="Religions" >
                                    <RadianForm.Input 
                                        id='signup-religion'
                                        onChange={e => handleValUpdate('religion', e.target.value)} 
                                        value={info.religion}    
                                    />
                                </RadianForm.Label>
                            </Col>
                            <Col lg={8}>
                                <RadianForm.Label 
                                    label="Gender" 
                                    required
                                    isError={validation.gender.error}
                                >
                                    <RadianForm.Select 
                                        value={info.gender}
                                        onChange={val => handleValUpdate('gender', val)} 
                                        style={{textTransform: 'capitalize'}}
                                    >
                                        { gender.map((g) => {
                                            return <Select.Option key={`signup-${g.value}`} value={g.value}>
                                                <span style={{textTransform: 'capitalize'}}>{g.label}</span>
                                            </Select.Option>
                                        })}
                                    </RadianForm.Select>
                                </RadianForm.Label>
                            </Col>
                        </Row>
                        <Row className="rd-signup-row" gutter={[HORIZONTAL_GUTTER, 0]}>
                            <Col lg={8}>
                                <RadianForm.Label 
                                    label="Nationality" 
                                    required
                                    isError={validation.nationality.error}
                                >
                                    <RadianForm.Input 
                                        id='signup-nationality'
                                        onChange={e => handleValUpdate('nationality', e.target.value)} 
                                        value={info.nationality}    
                                    />
                                </RadianForm.Label>
                            </Col>
                            <Col lg={8}>
                                <RadianForm.Label 
                                    label="Ethnicity" 
                                    required
                                    isError={validation.ethnicity   .error}
                                >
                                    <RadianForm.Input 
                                        id='signup-ethnicity'
                                        onChange={e => handleValUpdate('ethnicity', e.target.value)} 
                                        value={info.ethnicity}    
                                    />
                                </RadianForm.Label>
                            </Col>
                        </Row>
                        <Row className="rd-signup-row" gutter={[HORIZONTAL_GUTTER, 0]}>
                            <Col lg={24}>
                                <RadianForm.Label label="Your interest(s)" >
                                    <RadianForm.TagSelect 
                                        maxTagCount={5}
                                        maxTagTextLength={20}
                                        options={TAG_OPTIONS} 
                                        onChange={arr => handleValUpdate('tags', arr)}
                                        value={info.tags} 
                                    />
                                </RadianForm.Label>
                            </Col>
                        </Row>
                    </div>
                    <SignupAction>
                        <Button 
                            className="rd-btn-light"
                            type="primary"
                            shape="round"
                            size="large"
                            onClick={handleNextClick}
                        >
                            Next
                        </Button>
                    </SignupAction>
                </div>
            </SignupFormWrapper>
        </div>
    )
};

export default SignupInfoPage;