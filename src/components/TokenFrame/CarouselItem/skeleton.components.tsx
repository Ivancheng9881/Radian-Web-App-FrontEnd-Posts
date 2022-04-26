import { Image } from "antd";
import { FC } from "react";
import config from "../../../commons/config";

const TokenCarouselItemSkeleton : FC = () => {
    const amount = 10;
    const fx = 1;
    const label = 'ETH'

    return (
        <div className="rd-token-item-root">
            <div className="rd-token-item-body rd-token-item-skeleton">
                <div className="rd-token-icon">
                    <Image width={40} height={40} src={`${config.assets.cdn}/icon/ethereum.png`} preview={false} />
                </div>
                <div className="rd-token-value">
                    <div className="rd-token-skeleton-title rd-token-title"></div>
                    <div className="rd-token-skeleton-title rd-token-subtitle"></div>
                </div>
            </div>
        </div>
    )
};

export default TokenCarouselItemSkeleton;