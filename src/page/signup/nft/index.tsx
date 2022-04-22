import { Button, Tabs, Typography } from "antd";
import { FC, useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router";
import {  SIGNUP_PROPIC_ROUTE, SIGNUP_TOKEN_ROUTE } from "../../../commons/route";
import SignupAction from "../components/signupAction";
import SignupReturn from "../components/signupReturn";
import SignupFormWrapperFullWidth from "../components/signupFormWrapper/fullwidth";
import { ITokenBalance } from "../../../schema/Token/tokenList";
import { COMMON_TOKEN_LIST } from "../../../commons/web3";
import NftEth from "./eth.components";

const SignupTokenPage : FC = () => {

    const history = useHistory<History>();
    
    const [ address, setAddress ] = useState<string>('0x8e79eF9e545Fa14e205D89970d50E7caA3456683');
    const [ currentNetwork, setCurrentNetwork ] = useState<string>('ethereum')

    const handleNextClick = () => {
        history.push(SIGNUP_TOKEN_ROUTE);
    };

    const handleReturnClick = () => {
        history.push(SIGNUP_PROPIC_ROUTE);
    };

    useEffect(() => {

    }, [])

    return (
        <div className="rd-signup-body">
            <div className="rd-signup-illustration rd-signup-illustration-blank"></div>
            <SignupFormWrapperFullWidth>
                <div className="rd-signup-form-root">
                    <SignupReturn onClick={handleReturnClick} />
                    <div className="rd-signup-card-root ">
                        <Tabs 
                            activeKey={currentNetwork} 
                        >
                            <Tabs.TabPane key='ethereum'>
                                <NftEth 
                                    address={address}
                                    mode='visibility'
                                    iconClx='rd-nft-action-icon rd-nft-action-icon-clickable rd-nft-action-icon-vis'
                                />
                            </Tabs.TabPane>
                            <Tabs.TabPane key='polygon'></Tabs.TabPane>
                            <Tabs.TabPane key='solana'></Tabs.TabPane>
                        </Tabs>
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