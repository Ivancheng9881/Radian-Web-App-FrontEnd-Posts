import {  Col, Row, Space, Typography } from "antd";
import { FC, useEffect, useState } from "react";
import LandingFadeInOutWrapper from "../FadeInOutWrapper.components";
import LandingSection from "../Section.components";
import LandingConnectWallet from "./ConnectWallet.components";
import UAParser from 'ua-parser-js';
import { WALLET_DOWNLOAD_LINK } from "../../../../commons/web3";

interface PageProps {
    isActive: boolean,
    passRef: React.RefObject<HTMLDivElement>,
}

const LandingSection1 : FC<PageProps> = ({isActive, passRef}) => {

    type TUserAgent = 'chrome' | 'firefox' | 'unsupported';

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
        }
        
    };

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
                            <Col span={12}>
                                <LandingConnectWallet 
                                    title='Metmamsk'
                                    iconName="metamask_square.png"
                                    downloadUri={WALLET_DOWNLOAD_LINK['metamask'][userAgent]}
                                />
                            </Col>
                            <Col span={12}>
                                <LandingConnectWallet 
                                    title='Phantom'
                                    iconName="phantom_square.png"
                                    downloadUri={WALLET_DOWNLOAD_LINK['phantom'][userAgent]}
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