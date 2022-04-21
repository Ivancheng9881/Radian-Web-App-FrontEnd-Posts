import { Col, Row } from "antd";
import { FC } from "react";
import GlassCard from "../../../../components/GlassCard";

const SignupFormWrapperFullWidth : FC = ({children}) => {

    return (
        <Row>
            <Col span={24}>
                <GlassCard>
                    {children}
                </GlassCard>
            </Col>
        </Row>
    )
};

export default SignupFormWrapperFullWidth;