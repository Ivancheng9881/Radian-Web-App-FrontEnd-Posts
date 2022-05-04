import { Button, Typography } from "antd";
import { FC, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import {  SIGNUP_NFT_ROUTE, SIGNUP_SUMMARY_ROUTE } from "../../../commons/route";
import SignupAction from "../components/signupAction";
import SignupReturn from "../components/signupReturn";
import SignupFormWrapperFullWidth from "../components/signupFormWrapper/fullwidth";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import TokenTable from "./TokenTable.components";
import { ITokenBalance, ITokenList } from "../../../schema/Token/tokenList";
import { COMMON_TOKEN_LIST } from "../../../commons/web3";
import Web3Context from "../../../utils/web3/context/web3.context";
import { getLastPriceBySymbol } from "../../../utils/web3/tokenPrice";
import searchEngineClient from "../../../utils/web3/searchEngine";

const SignupTokenPage : FC = () => {

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
    `

    const history = useHistory();
    const web3Context = useContext(Web3Context);

    const [ tokenListVariable, setTokenListVariable ] = useState<ITokenList[]>(COMMON_TOKEN_LIST);
    const [ address, setAddress ] = useState<string>(web3Context.providers?.['metamask@erc']);
    const [ priceSymbols, setPriceSymbols ] = useState<string[]>(['eth', 'matic']);
    const [ tokenList, setTokenList ] = useState<ITokenBalance[]>();

    const handleNextClick = () => history.push(SIGNUP_SUMMARY_ROUTE);

    const handleReturnClick = () => history.push(SIGNUP_NFT_ROUTE);

    const execTokenListQuery = async () => {
        const { loading, data, error } = await searchEngineClient.query({
            query: TOKEN_BALANCE_QUERY,
            variables: {
                address: address,
                symbols: tokenListVariable,
                priceSymbols: priceSymbols
            }
        });

        if (!loading) {
            if (error) {
                console.log(error)
            } else {
                const _tokenList = data.tokenList?.map((t: ITokenBalance) => {
                    let lastPrice = getLastPriceBySymbol(t, data.priceFeed);
    
                    return { ...t, lastPrice: lastPrice }
                });
    
                setTokenList(_tokenList);
            }
        }
    }

    useEffect(() => {
        if (tokenListVariable.length > 0 && priceSymbols.length > 0) {
            execTokenListQuery();
        }
    }, [tokenListVariable, priceSymbols])

    return (
        <div className="rd-signup-body">
            <div className="rd-signup-illustration rd-signup-illustration-blank"></div>
            <SignupFormWrapperFullWidth>
                <div className="rd-signup-form-root">
                    <SignupReturn onClick={handleReturnClick} />
                    <div className="rd-signup-card-root ">
                        <div className="rd-flexbox rd-flexbox-full">
                            <div className="rd-flexbox rd-flexbox-full rd-flexbox-vertical">
                                {/* title */}
                                <div className="rd-signup-card-title">
                                    <Typography.Title level={3}>
                                        Token Assets
                                    </Typography.Title>
                                </div>
                                {/* subtitle */}
                                {/* <br/><br/><br/>
                                <br/> */}
                                <div className="rd-signup-card-subtitle">
                                    {/* <Typography.Title level={3}>
                                        New Tokens Assets
                                    </Typography.Title> */}
                                </div>
                                <TokenTable data={tokenList} />
                            </div>
                        </div>
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
            </SignupFormWrapperFullWidth>
        </div>
    )
};

export default SignupTokenPage;