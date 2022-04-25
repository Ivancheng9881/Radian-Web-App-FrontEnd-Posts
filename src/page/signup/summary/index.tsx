import { EditOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import { FC, useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { SIGNUP_INFO_ROUTE } from "../../../commons/route";
import SignupContext from "../context/signup.context";
import { ISignupContext } from "../nft/type";
import SignupSummaryInfo from "./info.components";

const SignupSummaryPage : FC = () => {

    const history = useHistory();
    const location = useLocation();
    const { 
        publicNft,
        info,
        publicToken,
    } : ISignupContext = useContext(SignupContext);

    const routeToInfo = (e: any) => {
        e.preventDefault();
        handleRoute(SIGNUP_INFO_ROUTE);
    };

    const handleRoute = (pathname: string) => {
        history.push({
            pathname: pathname,
            state: { fromSummary: true }
        })
    }

    return (
        <div className="rd-signup-body">
            <div className="rd-signup-summary">
                <Row gutter={[0, 24]}>
                    <Col lg={24}>
                        <Typography.Title level={2} className='rd-align rd-align-center rd-typo-reverse'>
                            RADIAN Passport Summary 
                        </Typography.Title>
                    </Col>
                    <Col lg={24}>
                        <Row >
                            <Col lg={24}>
                                <Typography.Title level={3} className='rd-typo-reverse'>
                                    Basic Information <EditOutlined onClick={routeToInfo} />
                                </Typography.Title>
                            </Col>
                            <Col lg={24}>
                                <SignupSummaryInfo />
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={24}>
                        <Row >
                            <Col lg={24}>
                                <Typography.Title level={3} className='rd-typo-reverse'>
                                    Token <EditOutlined />
                                </Typography.Title>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={24} >
                        <Row >
                            <Col lg={24}>
                                <Typography.Title level={3} className='rd-typo-reverse'>
                                    NFT <EditOutlined />
                                </Typography.Title>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    )
};

export default SignupSummaryPage;