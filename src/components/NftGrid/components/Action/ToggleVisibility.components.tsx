import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { FC, Fragment } from "react";
import { INftActionBaseProps } from "./Action";

interface NftGridToggleVisibilityProps extends INftActionBaseProps {
    visible?: boolean,
    visibleKey?: string,
    onIconClick?(): Promise<void>
};

const NftGridActionVisibility : FC<NftGridToggleVisibilityProps> = (props) => {

    const iconProps = {
        className: props.iconClx,
        onClick: props.onIconClick
    }

    return (
        <Fragment>
            {
                props.visible 
                ? <EyeOutlined {...iconProps} />
                : <EyeInvisibleOutlined {...iconProps} />
            }
        </Fragment>
    )
};

export type { NftGridToggleVisibilityProps };

export default NftGridActionVisibility