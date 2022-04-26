import { Image } from "antd";
import { FC } from "react";
import config from "../../../commons/config";
import { parseTokenSymbol } from "../../../utils/web3/tokenPrice";

interface TokenCarouselItemProps {
    amount: number,
    fx: number,
    label: string,
}

const TokenCarouselItem : FC<TokenCarouselItemProps> = (props) => {
    const { amount, fx, label } = props;

    return (
        <div className="rd-token-item-root">
            <div className="rd-token-item-body">
                <div className="rd-token-icon">
                    <Image width={40} height={40} src={`${config.assets.cdn}/icon/ethereum.png`} preview={false} />
                </div>
                <div className="rd-token-value">
                    <div className="rd-token-title">{`${amount.toPrecision(3)} ${parseTokenSymbol(label)}`}</div>
                    <div className="rd-token-subtitle">{`USD $${(fx * amount).toPrecision(3)}`}</div>
                </div>
            </div>
        </div>
    )
};

export default TokenCarouselItem;