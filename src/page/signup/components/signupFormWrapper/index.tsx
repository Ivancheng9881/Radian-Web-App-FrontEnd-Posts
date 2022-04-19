import { Col, Row } from "antd";
import { FC } from "react";
import GlassCard from "../../../../components/GlassCard";

const SignupFormWrapper : FC = ({children}) => {

    return (
        <Row>
            <Col span={6} ></Col>
            <Col span={18}>
                <GlassCard>
                    {children}
                </GlassCard>
            </Col>
        </Row>
    )
};

export default SignupFormWrapper;