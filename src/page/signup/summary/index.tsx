import { EditOutlined } from "@ant-design/icons";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Col, Row, Typography } from "antd";
import { FC, useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { SIGNUP_INFO_ROUTE, SIGNUP_NFT_ROUTE, SIGNUP_TOKEN_ROUTE } from "../../../commons/route";
import { COMMON_TOKEN_LIST } from "../../../commons/web3";
import { ITokenBalance, ITokenList } from "../../../schema/Token/tokenList";
import { mapTokenPrice } from "../../../utils/web3/tokenPrice";
import SignupContext from "../context/signup.context";
import { ISignupContext } from "../type";
import SignupSummaryAction from "./action.components";
import SignupSummaryInfo from "./info.components";
import SignupSummaryNft from "./nft.components";
import SignupSummaryToken from "./token.components";

const SignupSummaryPage : FC = () => {

    const history = useHistory();
    const {  publicToken, } : ISignupContext = useContext(SignupContext);

    const TOKEN_BALANCE_QUERY = gql`
        query getTokenList(
            $address: String!,
            $symbols: [TokenSearchQuery]!,
            $priceSymbols: [String]!
        ) {
            tokenList(
                address: $address, 
                tokens: $symbols
            ) {
                balance
                tokens {
                address
                network
                balance
                decimals
                symbol
                }
            }
            priceFeed(
                symbols: $priceSymbols
            ) {
                symbol
                price
                updatedAt
            }
        }
    `;

    const [ tokenListVariable, setTokenListVariable ] = useState<ITokenList[]>();
    const [ address, setAddress ] = useState<string>('0xB246b07E891914701CE706fda2E3c460031Ca25a');
    const [ priceSymbols, setPriceSymbols ] = useState<string[]>(['eth', 'matic']);
    const [ tokenList, setTokenList ] = useState<ITokenBalance[]>();

    const [ getTokenBalance ] = useLazyQuery(TOKEN_BALANCE_QUERY);

    const routeToInfo = () => handleRoute(SIGNUP_INFO_ROUTE);

    const routeToNft = () => handleRoute(SIGNUP_NFT_ROUTE);

    const routeToToken = () => handleRoute(SIGNUP_TOKEN_ROUTE)

    const handleRoute = (pathname: string) => {
        history.push({
            pathname: pathname,
            state: { fromSummary: true }
        })
    };

    const execQuery = async () => {
        const { loading, data, error } = await getTokenBalance({
            variables: {
                address: address,
                symbols: tokenListVariable,
                priceSymbols: priceSymbols
            }
        });
        if (!loading) {
            setTokenList(mapTokenPrice(data.tokenList, data.priceFeed));
        }
    }

    useEffect(() => {
        if (tokenListVariable) {
            execQuery();
        }
    }, [tokenListVariable]);

    useEffect(() => {
        if (publicToken) {
            // filter the common token list 
            // so that only those selected by the user will show up here
            let _tokenList = COMMON_TOKEN_LIST.filter((t) => {
                if (publicToken.includes(t.symbol.toUpperCase())) {
                    return true
                }
            });
            setTokenListVariable(_tokenList)
        }
    }, [publicToken])

    return (
        <div className="rd-signup-body">
            <div className="rd-signup-illustration rd-signup-illustration-blank"></div>
            <div className="rd-signup-summary">
                <Row gutter={[0, 48]}>
                    <Col lg={24}>
                        <Typography.Title level={2} className='rd-align rd-align-center rd-typo-reverse'>
                            RADIAN Passport Summary 
                        </Typography.Title>
                    </Col>
                    <Col lg={24}>
                        <Row >
                            <Col lg={24}>
                                <Typography.Title level={5} className='rd-signup-summary-heading rd-typo-reverse'>
                                    Basic Information 
                                    <EditOutlined className="rd-signup-summary-icon" onClick={routeToInfo} />
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
                                <Typography.Title level={5} className='rd-signup-summary-heading rd-typo-reverse'>
                                    Token 
                                    <EditOutlined className="rd-signup-summary-icon" onClick={routeToToken} />
                                </Typography.Title>
                            </Col>
                            <Col lg={24}>
                                <SignupSummaryToken tokenList={tokenList} />
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={24} >
                        <Row>
                            <Col lg={24}>
                                <Typography.Title level={5} className='rd-signup-summary-heading rd-typo-reverse'>
                                    NFT 
                                    <EditOutlined className="rd-signup-summary-icon" onClick={routeToNft}/>
                                </Typography.Title>
                            </Col>
                            <Col lg={24}>
                                <SignupSummaryNft />
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={24}>
                        <SignupSummaryAction />
                    </Col>
                </Row>
            </div>
        </div>
    )
};

export default SignupSummaryPage;