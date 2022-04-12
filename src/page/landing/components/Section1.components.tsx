import { Button, Space, Typography } from "antd";
import { FC } from "react";
import config from "../../../commons/config";
import LandingFadeInOutWrapper from "./FadeInOutWrapper.components";
import LandingSection from "./Section.components";

interface PageProps {
    isActive: boolean,
    passRef: React.RefObject<HTMLDivElement>,
}

const LandingSection1 : FC<PageProps> = ({isActive, passRef}) => {
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
                        <br/>
                        <Space direction="horizontal" size='large'>
                            <Space direction="vertical" align="center" size='large'>
                                <img src={`${config.assets.cdn}/icon/metamask_square.png`} alt='connect with metamask' />
                                <Button type="primary" size="large" shape="round" >
                                    Metamask
                                </Button>
                                <Button type="link" className="rd-btn-img" >
                                    <img src={`${config.assets.cdn}/icon/new_tab.png`} /> download wallet
                                </Button>
                            </Space>
                            <Space direction="vertical" align="center" size='large'>
                                <img src={`${config.assets.cdn}/icon/metamask_square.png`} alt='connect with metamask' />
                                <Button type="primary" size="large" shape="round" >
                                    Metamask
                                </Button>
                                <Button type="link" className="rd-btn-img" >
                                    <img src={`${config.assets.cdn}/icon/new_tab.png`} /> download wallet
                                </Button>
                            </Space>
                        </Space>
                    </div>
                </div>
            </LandingSection>
        </LandingFadeInOutWrapper>
    )
};

export default LandingSection1;