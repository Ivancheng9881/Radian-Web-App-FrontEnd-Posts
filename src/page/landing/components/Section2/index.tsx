import { Space, Typography } from "antd";
import { FC } from "react";
import config from "../../../../commons/config";
import LandingFadeInOutWrapper from "../FadeInOutWrapper.components";
import LandingSection from "../Section.components";

interface PageProps {
    isActive: boolean,
    passRef: React.RefObject<HTMLDivElement>,
}

const LandingSection2 : FC<PageProps> = ({isActive, passRef}) => {
    return (
        <LandingFadeInOutWrapper isActive={isActive}>
            <LandingSection passRef={passRef}>
                <div className="rd-flexbox-vertical-center">
                    <div className="rd-landing-content-group">
                        <div className="rd-flexbox rd-flexbox-horizontal">
                            <div>
                                <img className="rd-img" src={`${config.assets.cdn}/logo/logo_square.png`} />
                            </div>
                        </div>
                        <br/>
                        <Typography.Title level={4} >
                            What is
                        </Typography.Title>
                        <Typography.Title level={1}>
                            RADIAN PASSPORT ?
                        </Typography.Title>
                        <br/>
                        <Typography.Text className="rd-typo-desc rd-typo-bounding rd-typo-family-regular" style={{width: 600}}>
                            Passport allows users to add personal photos, personal information, NFTs gallary and bind to wallet address(es) across multi blockchains. This universal decentralised identity allowing them to gain access web3 social dApp.
                        </Typography.Text>
                    </div>
                </div>

            </LandingSection>
        </LandingFadeInOutWrapper>
    )
};

export default LandingSection2;