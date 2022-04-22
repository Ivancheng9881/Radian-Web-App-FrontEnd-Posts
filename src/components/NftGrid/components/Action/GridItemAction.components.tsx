import { FC, Fragment } from "react";
import { GridModeType } from "../Grid";
import NftGridActionVisibility, { NftGridToggleVisibilityProps } from "./ToggleVisibility.components";

interface NftGridItemActionProps extends NftGridToggleVisibilityProps {
    mode?: GridModeType,
}

const NftGridItemAction : FC<NftGridItemActionProps> = (props) => {
    return (
        <Fragment>
            { props.mode === 'visibility' && <NftGridActionVisibility {...props} /> }
        </Fragment>
    )
};

export type { NftGridItemActionProps }

export default NftGridItemAction;