import { Col, Row } from "antd";
import { FC } from "react";
import config from '../../../commons/config';
import GlassCard from "../../../components/GlassCard";

const SignupInfoPage : FC = () => {

    return (
        <div className="rd-signup-body">
            <div className="rd-signup-illustration">
                <img src={`${config.assets.cdn}/signup/illustration_1_desktop.png`} />
            </div>
            <Row>
                <Col span={6} ></Col>
                <Col span={18}>
                    <GlassCard />
                </Col>
            </Row>
        </div>
    )
};

export default SignupInfoPage;