import { Button, Typography } from "antd";
import { FC, useState, useEffect } from "react";
import { useHistory } from "react-router";
import {  SIGNUP_PROPIC_ROUTE } from "../../../commons/route";
import SignupAction from "../components/signupAction";
import SignupReturn from "../components/signupReturn";
import SignupFormWrapperFullWidth from "../components/signupFormWrapper/fullwidth";
import RadianInput from "../../../components/RadianForm";
import { gql, useQuery } from "@apollo/client";
import TokenTable from "./TokenTable.components";
import { ITokenBalance } from "../../../schema/Token/tokenList";

const SignupTokenPage : FC = () => {



    const TOKEN_BALANCE_QUERY = gql`
        query getTokenList(
            $address: String!,
            $symbols: [TokenSearchQuery]!
        ) {
            tokenList(
                address: $address, 
                tokens: $symbols
            ) {
                lastPrice
                balance
                tokens {
                address
                network
                balance
                decimals
                symbol
                }
            }
        }
    `

    const history = useHistory<History>();
    
    const [ tokenListVariable, setTokenListVariable ] = useState([
        {
          "symbol": "usdt",
          "contract": [
            {
              "network": "polygon",
              "address": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
            }
          ]
        },
        {
          "symbol": "matic",
          "contract": [
            {
              "network": "polygon",
              "address": "0x0000000000000000000000000000000000000000"
            }
          ]
        }
    ]);
    const [ address, setAddress ] = useState<string>('0x98ca954886C04908602E36f054e2AF461c04cAd5');
    const [ tokenList, setTokenList ] = useState<ITokenBalance[]>();

    const { loading, error, data } = useQuery(TOKEN_BALANCE_QUERY, {
        variables: {
            address: address,
            symbols: tokenListVariable
        }
    });

    const handleNextClick = () => {
        history.push(SIGNUP_PROPIC_ROUTE);
    };

    const handleReturnClick = () => {
        history.push(SIGNUP_PROPIC_ROUTE);
    };

    useEffect(() => {
      console.log(data);
      if (!loading) {
          setTokenList(data.tokenList)
      }

    }, [loading, data])
    

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
                                    <Typography.Title level={2}>
                                        Token Assets
                                    </Typography.Title>
                                </div>
                                {/* subtitle */}
                                <div className="rd-signup-card-subtitle">
                                    <Typography.Title level={3}>
                                        New Tokens Assets
                                    </Typography.Title>
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