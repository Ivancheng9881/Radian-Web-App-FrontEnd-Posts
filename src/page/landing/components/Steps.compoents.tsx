import { Typography } from "antd";
import { FC, useEffect, useState } from "react";
import config from "../../../commons/config";
import LandingSection from "./Section.components";


const LandingStep : FC = () => {

    const [counter, setCounter] = useState(0);

    // Third Attempts
    useEffect(() => {
      const timer = setInterval(() => setCounter(counter + 1), 2000);
      return () => clearInterval(timer);
    }, [counter]);

    return (
        <LandingSection>
            <div className="rd-landing-orbit-root">
                <div className="rd-landing-orbit-inner">
                    <Typography.Title className="rd-landing-orbit-content" level={3}>Create profiles with few steps</Typography.Title>
                    <div 
                        className={`rd-landing-orbit-item rd-landing-orbit-item-1 
                        ${counter % 4 == 0  && 'rd-landing-orbit-item-active'}`}
                    >
                        <img src={`${config.assets.cdn}/landing-page/icon_feature_information.png`} />
                    </div>
                    <div 
                        className={`rd-landing-orbit-item rd-landing-orbit-item-2
                        ${counter % 4 == 1 && 'rd-landing-orbit-item-active'}`}

                    >
                        <img src={`${config.assets.cdn}/landing-page/icon_feature_nft.png`} />
                    </div>
                    <div 
                        className={`rd-landing-orbit-item rd-landing-orbit-item-3
                        ${counter % 4 == 2 && 'rd-landing-orbit-item-active'}`}
                    >
                        <img src={`${config.assets.cdn}/landing-page/icon_feature_summary.png`} />
                    </div>
                    <div 
                        className={`rd-landing-orbit-item rd-landing-orbit-item-4
                        ${counter % 4 == 3 && 'rd-landing-orbit-item-active'}`}
                    >
                        <img src={`${config.assets.cdn}/landing-page/icon_feature_asset.png`} />
                    </div>
                </div>

            </div>
        </LandingSection>
    )
};

export default LandingStep;