import { Button, Checkbox, Col, Row, Typography } from "antd";
import { FC } from "react";

const SignupSummaryAction : FC = () => {

    return (
        <Row gutter={[0, 36]} justify='center' >
            <Col lg={24} style={{textAlign: 'center'}}>
                <Checkbox >
                    <Typography.Text strong className="rd-typo-reverse">I accept terms and condition</Typography.Text>
                </Checkbox>
            </Col>
            <Col lg={24} style={{textAlign: 'center'}}>
                <Button 
                    className="rd-btn-light"
                    type="primary"
                    shape="round"
                    size="large"
                >
                    Register
                </Button>
            </Col>
        </Row>
    )
};

export default SignupSummaryAction;