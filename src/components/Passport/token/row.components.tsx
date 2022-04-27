import { Col, Row } from "antd";
import { FC } from "react";
import { ITokenBalance } from "../../../schema/Token/tokenList";
import { parseTokenName, parseTokenSymbol } from "../../../utils/web3/tokenPrice";

interface TokenBalanceRowProps {
    data: ITokenBalance
}

const TokenBalanceRow : FC<TokenBalanceRowProps> = (props) => {
    const { data } = props;
    const PRECISION = 4;

    return (
        <Row className="rd-assets-token-row">
            <Col className="rd-assets-token-item" lg={12}>{parseTokenName(data.tokens[0].symbol)}</Col>
            <Col className="rd-assets-token-item" lg={6}>{(data.balance).toPrecision(PRECISION)}{parseTokenSymbol(data.tokens[0].symbol)}</Col>
            <Col className="rd-assets-token-item" lg={6}>${(data.lastPrice * data.balance).toPrecision(PRECISION)}</Col>
        </Row>
    )
};

export default TokenBalanceRow