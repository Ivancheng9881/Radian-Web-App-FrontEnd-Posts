import { Typography } from "antd";
import { FC, useEffect, useState } from "react";
import { Transition, animated } from "react-spring";
import config from "../../../commons/config";
import Circle from "./Circle.components";
import LandingFadeInOutWrapper from "./FadeInOutWrapper.components";
import LandingSection from "./Section.components";
import StepContent from "./StepContent.components";

interface PageProps {
    passRef: React.RefObject<HTMLDivElement>,
    isActive: boolean,
}

const LandingSection3 : FC<PageProps> = ({passRef, isActive}) => {

    const [counter, setCounter] = useState<number>(0);

    const BODY_TEXT = [
        {
            title: 'Step 1:',
            subtitle: 'Personal Information',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing ! elit. Nunc lacus, pharetra nunc aliquam sem ut sed tincidunt. Neque tristique risus egestas condimentum integer odio. Eget vitae congue amet duis sed eget. Viverra feugiat amet tortor, nunc id.'
        },
        {
            title: 'Step 2:',
            subtitle: 'NFT',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing ! elit. Nunc lacus, pharetra nunc aliquam sem ut sed tincidunt. Neque tristique risus egestas condimentum integer odio. Eget vitae congue amet duis sed eget. Viverra feugiat amet tortor, nunc id.'
        },
        {
            title: 'Step 3:',
            subtitle: 'Asset',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing ! elit. Nunc lacus, pharetra nunc aliquam sem ut sed tincidunt. Neque tristique risus egestas condimentum integer odio. Eget vitae congue amet duis sed eget. Viverra feugiat amet tortor, nunc id.'
        },
        {
            title: 'Step 4:',
            subtitle: 'Chats',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing ! elit. Nunc lacus, pharetra nunc aliquam sem ut sed tincidunt. Neque tristique risus egestas condimentum integer odio. Eget vitae congue amet duis sed eget. Viverra feugiat amet tortor, nunc id.'
        }
    ] as const;

    useEffect(() => {
      const timer = setInterval(() => setCounter(counter + 1), 5000);
      return () => clearInterval(timer);
    }, [counter]);

    return (
        <LandingFadeInOutWrapper isActive={isActive}>
            <LandingSection passRef={passRef} >
                <div className="rd-landing-orbit-root">
                    <div className="rd-landing-orbit-gradient-outer">
                        <div className="rd-landing-orbit-inner rd-landing-orbit-gradient-inner">
                            <div className="rd-landing-orbit-content">
                                <div className="rd-landing-orbit-content-inner rd-landing-content-group">
                                    <Typography.Title level={4} >Create profile with</Typography.Title>
                                    <Typography.Title level={1} >FEW STEPS</Typography.Title>
                                    <div className="rd-landing-orbit-content-animation-root">
                                        <StepContent content={BODY_TEXT[0]} isActive={counter % 4 === 0} />
                                        <StepContent content={BODY_TEXT[1]} isActive={counter % 4 === 1} />
                                        <StepContent content={BODY_TEXT[2]} isActive={counter % 4 === 2} />
                                        <StepContent content={BODY_TEXT[3]} isActive={counter % 4 === 3} />
                                    </div>
                                </div>
                            </div>
                            <div className={`rd-landing-orbit-item rd-landing-orbit-item-1 ${counter % 4 === 0  && 'rd-active'}`}>
                                <img src={`${config.assets.cdn}/landing-page/icon_feature_information.png`} />
                            </div>
                            <div className={`rd-landing-orbit-item rd-landing-orbit-item-2 ${counter % 4 === 1 && 'rd-active'}`}>
                                <img src={`${config.assets.cdn}/landing-page/icon_feature_nft.png`} />
                            </div>
                            <div className={`rd-landing-orbit-item rd-landing-orbit-item-3 ${counter % 4 === 2 && 'rd-active'}`}>
                                <img src={`${config.assets.cdn}/landing-page/icon_feature_summary.png`} />
                            </div>
                            <div className={`rd-landing-orbit-item rd-landing-orbit-item-4 ${counter % 4 === 3 && 'rd-active'}`}>
                                <img src={`${config.assets.cdn}/landing-page/icon_feature_asset.png`} />
                            </div>
                            <Circle />
                        </div>
                    </div>

                </div>
            </LandingSection>    
        </LandingFadeInOutWrapper>
        
    )
};

export default LandingSection3;