import { Typography } from "antd";
import { FC, useEffect, useState } from "react";
import config from "../../../commons/config";
import LandingSection from "./Section.components";

interface PageProps {
    passRef: React.RefObject<HTMLDivElement>,
}

const LandingStep : FC<PageProps> = ({passRef}) => {

    const [counter, setCounter] = useState<number>(0);

    const BODY_TEXT = [
        {
            title: 'step 1:',
            subtitle: 'Personal Information',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing ! elit. Nunc lacus, pharetra nunc aliquam sem ut sed tincidunt. Neque tristique risus egestas condimentum integer odio. Eget vitae congue amet duis sed eget. Viverra feugiat amet tortor, nunc id.'
        },
        {
            title: 'step 2:',
            subtitle: 'NFT',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing ! elit. Nunc lacus, pharetra nunc aliquam sem ut sed tincidunt. Neque tristique risus egestas condimentum integer odio. Eget vitae congue amet duis sed eget. Viverra feugiat amet tortor, nunc id.'
        },
        {
            title: 'step 3:',
            subtitle: 'Asset',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing ! elit. Nunc lacus, pharetra nunc aliquam sem ut sed tincidunt. Neque tristique risus egestas condimentum integer odio. Eget vitae congue amet duis sed eget. Viverra feugiat amet tortor, nunc id.'
        },
        {
            title: 'step 4:',
            subtitle: 'Chats',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing ! elit. Nunc lacus, pharetra nunc aliquam sem ut sed tincidunt. Neque tristique risus egestas condimentum integer odio. Eget vitae congue amet duis sed eget. Viverra feugiat amet tortor, nunc id.'
        }
    ] as const;

    useEffect(() => {
      const timer = setInterval(() => setCounter(counter + 1), 5000);
      return () => clearInterval(timer);
    }, [counter]);

    return (
        <LandingSection passRef={passRef} >
            <div className="rd-landing-orbit-root">
                <div className="rd-landing-orbit-gradient-outer">
                    <div className="rd-landing-orbit-inner rd-landing-orbit-gradient-inner">
                        <div className="rd-landing-orbit-content">
                            <div className="rd-landing-orbit-content-inner">
                                <Typography.Title level={4} >Create profile with</Typography.Title>
                                <Typography.Title level={1} >FEW STEPS</Typography.Title>
                                <Typography.Text className="rd-landing-orbit-text-animation rd-landing-orbit-title rd-landing-orbit-title-blue">
                                    {BODY_TEXT[counter % 4].title}
                                </Typography.Text>
                                <Typography.Text className="rd-landing-orbit-text-animation rd-landing-orbit-title">
                                    {BODY_TEXT[counter % 4].subtitle}
                                </Typography.Text>
                                <Typography.Text className="rd-landing-orbit-text-animation rd-landing-orbit-desc rd-typo-family-regular">
                                    {BODY_TEXT[counter % 4].body}
                                </Typography.Text>
                            </div>
                        </div>
                        <div 
                            className={`rd-landing-orbit-item rd-landing-orbit-item-1 ${counter % 4 == 0  && 'rd-landing-orbit-item-active'}`}
                        >
                            <img src={`${config.assets.cdn}/landing-page/icon_feature_information.png`} />
                        </div>
                        <div 
                            className={`rd-landing-orbit-item rd-landing-orbit-item-2 ${counter % 4 == 1 && 'rd-landing-orbit-item-active'}`}
                        >
                            <img src={`${config.assets.cdn}/landing-page/icon_feature_nft.png`} />
                        </div>
                        <div 
                            className={`rd-landing-orbit-item rd-landing-orbit-item-3 ${counter % 4 == 2 && 'rd-landing-orbit-item-active'}`}
                        >
                            <img src={`${config.assets.cdn}/landing-page/icon_feature_summary.png`} />
                        </div>
                        <div 
                            className={`rd-landing-orbit-item rd-landing-orbit-item-4 ${counter % 4 == 3 && 'rd-landing-orbit-item-active'}`}
                        >
                            <img src={`${config.assets.cdn}/landing-page/icon_feature_asset.png`} />
                        </div>
                    </div>
                </div>

            </div>
        </LandingSection>
    )
};

export default LandingStep;