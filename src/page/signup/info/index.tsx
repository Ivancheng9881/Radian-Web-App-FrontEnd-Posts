import { Button, Col, Row, Select, Typography } from "antd";
import { FC } from "react";
import config from '../../../commons/config';
import RadianForm from "../../../components/RadianForm";
import GlassCard from "../../../components/GlassCard";
import { gender } from "../../../commons/signupOptions";
import { useHistory } from "react-router";
import { signupPropicRoute } from "../../../commons/route";
import SignupAction from "../components/signupAction";
import SignupFormWrapper from "../components/signupFormWrapper";
import SignupReturn from "../components/signupReturn";

const SignupInfoPage : FC = () => {

    const HORIZONTAL_GUTTER = { md: 44 };
    
    const history = useHistory<History>();

    const handleNextClick = () => {
        history.push(signupPropicRoute);
    };

    // const handleBackClick = () => {
    //     history.push
    // }

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
                                Create RADIAN PASSWORD
                            </Typography.Title>
                        </div>
                        <Row className="rd-signup-row" gutter={[HORIZONTAL_GUTTER, 0]}>
                            <Col lg={8}>
                                <RadianForm.Label label="First Name" required>
                                    <RadianForm.Input />
                                </RadianForm.Label>
                            </Col>
                            <Col lg={8}>
                                <RadianForm.Label label="Last Name" required>
                                    <RadianForm.Input />
                                </RadianForm.Label>
                            </Col>
                            <Col lg={8}>
                                <RadianForm.Label label="Username" required>
                                    <RadianForm.Input />
                                </RadianForm.Label>
                            </Col>
                        </Row>
                        <Row className="rd-signup-row" gutter={[HORIZONTAL_GUTTER, 0]}>
                            <Col lg={8}>
                                <RadianForm.Label label="Location" required>
                                    <RadianForm.Input />
                                </RadianForm.Label>
                            </Col>
                            <Col lg={8}>
                                <RadianForm.Label label="Religions" >
                                    <RadianForm.Input />
                                </RadianForm.Label>
                            </Col>
                            <Col lg={8}>
                                <RadianForm.Label label="Gender" required>
                                    <RadianForm.Select  >
                                        {
                                            gender.map((g) => {
                                                return <Select.Option key={`signup-${g.value}`} value={g.value}>
                                                    {g.label}
                                                </Select.Option>
                                            })
                                        }
                                    </RadianForm.Select>
                                </RadianForm.Label>
                            </Col>
                        </Row>
                        <Row className="rd-signup-row" gutter={[HORIZONTAL_GUTTER, 0]}>
                            <Col lg={8}>
                                <RadianForm.Label label="Nationality" required>
                                    <RadianForm.Input />
                                </RadianForm.Label>
                            </Col>
                            <Col lg={8}>
                                <RadianForm.Label label="Ethnicity" required>
                                    <RadianForm.Input />
                                </RadianForm.Label>
                            </Col>
                        </Row>
                        <Row className="rd-signup-row" gutter={[HORIZONTAL_GUTTER, 0]}>
                            <Col lg={24}>
                                <RadianForm.Label label="Your tag(s)" >
                                    <RadianForm.TagSelect options={[
                                        {label: 'radian passport', value: 'radianPassport'}
                                    ]} />
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