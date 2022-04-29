import { Typography } from "antd";
import { FC, useEffect, useState } from "react";
import config from "../../../../commons/config";
import LandingFadeInOutWrapper from "../FadeInOutWrapper.components";
import LandingSection from "../Section.components";
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
            subtitle: 'Your Assets',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing ! elit. Nunc lacus, pharetra nunc aliquam sem ut sed tincidunt. Neque tristique risus egestas condimentum integer odio. Eget vitae congue amet duis sed eget. Viverra feugiat amet tortor, nunc id.'
        },
        {
            title: 'Step 3:',
            subtitle: 'Summary',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing ! elit. Nunc lacus, pharetra nunc aliquam sem ut sed tincidunt. Neque tristique risus egestas condimentum integer odio. Eget vitae congue amet duis sed eget. Viverra feugiat amet tortor, nunc id.'
        },
        {
            title: 'Step 4:',
            subtitle: 'All Set!',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing ! elit. Nunc lacus, pharetra nunc aliquam sem ut sed tincidunt. Neque tristique risus egestas condimentum integer odio. Eget vitae congue amet duis sed eget. Viverra feugiat amet tortor, nunc id.'
        }
    ] as const;

    const contentIsActive = (val: number) : boolean => counter % 4 === val;

    const activeClxName = (val: number) : string => {
        return contentIsActive(val) ? 'rd-active' : ''
    }

    useEffect(() => {
      const timer = setInterval(() => setCounter(counter + 1), 3500);
      return () => clearInterval(timer);
    }, [counter]);

    return (
        <LandingFadeInOutWrapper isActive={isActive}>
            <LandingSection passRef={passRef} >
                <div className="rd-flexbox rd-flexbox-vertical-center">
                    <div className="rd-landing-orbit-root">
                        <div className="rd-landing-orbit-inner">
                            <div className="rd-landing-orbit-item-md" >
                                <div className={`rd-landing-orbit-item rd-landing-orbit-item-1 ${activeClxName(0)}`}>
                                    <img src={`${config.assets.cdn}/landing-page/icon_feature_information.png`} />
                                </div>
                                <div className={`rd-landing-orbit-item rd-landing-orbit-item-2 ${activeClxName(1)}`}>
                                    <img src={`${config.assets.cdn}/landing-page/icon_feature_nft.png`} />
                                </div>
                                <div className={`rd-landing-orbit-item rd-landing-orbit-item-3 ${activeClxName(2)}`}>
                                    <img src={`${config.assets.cdn}/landing-page/icon_feature_summary.png`} />
                                </div>
                                <div className={`rd-landing-orbit-item rd-landing-orbit-item-4 ${activeClxName(3)}`}>
                                    <img src={`${config.assets.cdn}/landing-page/icon_feature_asset.png`} />
                                </div>
                            </div>
                            <div className="rd-landing-orbit-content">
                                <div className="rd-landing-orbit-content-inner rd-landing-content-group">
                                    <Typography.Title level={4} >Create profile with</Typography.Title>
                                    <Typography.Title level={1} >FEW STEPS</Typography.Title>
                                    <div className="rd-landing-orbit-content-animation-root">
                                        <StepContent content={BODY_TEXT[0]} isActive={contentIsActive(0)} />
                                        <StepContent content={BODY_TEXT[1]} isActive={contentIsActive(1)} />
                                        <StepContent content={BODY_TEXT[2]} isActive={contentIsActive(2)} />
                                        <StepContent content={BODY_TEXT[3]} isActive={contentIsActive(3)} />
                                    </div>
                                </div>
                            </div>
                            <div className={`rd-landing-orbit-item-lg rd-landing-orbit-item rd-landing-orbit-item-1 ${activeClxName(0)}`}>
                                <img src={`${config.assets.cdn}/landing-page/icon_feature_information.png`} />
                            </div>
                            <div className={`rd-landing-orbit-item-lg rd-landing-orbit-item rd-landing-orbit-item-2 ${activeClxName(1)}`}>
                                <img src={`${config.assets.cdn}/landing-page/icon_feature_nft.png`} />
                            </div>
                            <div className={`rd-landing-orbit-item-lg rd-landing-orbit-item rd-landing-orbit-item-3 ${activeClxName(2)}`}>
                                <img src={`${config.assets.cdn}/landing-page/icon_feature_summary.png`} />
                            </div>
                            <div className={`rd-landing-orbit-item-lg rd-landing-orbit-item rd-landing-orbit-item-4 ${activeClxName(3)}`}>
                                <img src={`${config.assets.cdn}/landing-page/icon_feature_asset.png`} />
                            </div>
                        </div>
                    </div>
                </div>
            </LandingSection>    
        </LandingFadeInOutWrapper>
        
    )
};

export default LandingSection3;