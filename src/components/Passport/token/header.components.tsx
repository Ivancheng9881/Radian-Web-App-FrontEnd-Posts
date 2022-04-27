import { Col, Row } from "antd";

const TokenBalanceHeader = () => {

    return (
        <Row className="rd-assets-token-row rd-assets-token-header">
            <Col className="rd-assets-token-item" lg={12}>Name</Col>
            <Col className="rd-assets-token-item" lg={6}>Amount</Col>
            <Col className="rd-assets-token-item" lg={6}>Total (USD)</Col>
        </Row>    
    )
};

export default TokenBalanceHeader;