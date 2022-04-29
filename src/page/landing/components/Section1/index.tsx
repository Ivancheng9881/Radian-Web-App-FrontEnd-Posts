import {  Col, Row, Space, Typography } from "antd";
import { FC, useContext, useEffect, useState } from "react";
import LandingFadeInOutWrapper from "../FadeInOutWrapper.components";
import LandingSection from "../Section.components";
import LandingConnectWallet from "./ConnectWallet.components";
import UAParser from 'ua-parser-js';
import { WALLET_DOWNLOAD_LINK } from "../../../../commons/web3";
import Web3Context from "../../../../utils/web3/context/web3.context";
import { useHistory } from "react-router";
import { SIGNUP_INFO_ROUTE, SIGNUP_ROUTE } from "../../../../commons/route";

interface PageProps {
    isActive: boolean,
    passRef: React.RefObject<HTMLDivElement>,
}

const LandingSection1 : FC<PageProps> = ({isActive, passRef}) => {

    type TUserAgent = 'chrome' | 'firefox' | 'unsupported';

    const web3Proivder = useContext(Web3Context);
    const history = useHistory<History>();

    const [ userAgent, setUserAgent ] = useState<TUserAgent>('unsupported');

    const parseUserAgent = () => {
        const ua = new UAParser();
        const { name } = ua.getBrowser();

        switch(name.toLowerCase()) {
            case 'chrome':
                setUserAgent('chrome')
                break;
            case 'firefox':
                setUserAgent('firefox');
                break;
            default:
                setUserAgent('unsupported');
                break
        }  
    };

    const handleConnectMetamask = async () => {
        const response = await handleConnect('erc');
        if (response) {
            history.push(SIGNUP_INFO_ROUTE);
        }
    }

    const handleConnect = async (network: string) => {
        return await web3Proivder.connect(network);
    } 

    useEffect(() => {
        parseUserAgent();
    }, [])

    return (
        <LandingFadeInOutWrapper isActive={isActive}>
            <LandingSection passRef={passRef}>
                <div className="rd-flexbox-vertical-center">
                    <div className="rd-landing-content-group">
                        <Typography.Title level={4} >
                            Connect your
                        </Typography.Title>
                        <Typography.Title level={1}>
                            RADIAN PASSPORT
                        </Typography.Title>
                        <br/><br/>
                        <Row gutter={{sm: 0, md: 24}}>
                            <Col span={24}>
                                <LandingConnectWallet 
                                    title='Metamask'
                                    iconName="metamask_square.png"
                                    downloadUri={WALLET_DOWNLOAD_LINK['metamask'][userAgent]}
                                    onClick={handleConnectMetamask}
                                    disabled={!web3Proivder.hasMetamask}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
            </LandingSection>
        </LandingFadeInOutWrapper>
    )
};

export default LandingSection1;