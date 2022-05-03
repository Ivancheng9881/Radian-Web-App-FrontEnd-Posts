import { Col, Row } from "antd";
import { FC } from "react";
import GlassCard from "../../../../components/GlassCard";

const SignupFormWrapper : FC = ({children}) => {

    return (
        <Row>
            <Col lg={6} md={0}></Col>
            <Col lg={18} md={24}>
                <GlassCard>
                    {children}
                </GlassCard>
            </Col>
        </Row>
    )
};

export default SignupFormWrapper;