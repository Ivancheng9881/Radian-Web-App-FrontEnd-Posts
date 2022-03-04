import { Button } from "antd";
import { FC } from "react";
import { FixLater } from "../../schema/helper.interface";
import MetamaskIcon from "../Icons/metamask.components";

interface PropsType {
    onClick: FixLater
};

const MetamaskButton : FC<PropsType> = (props) => {

    return (
        <Button 
            type="primary"
            shape='round'
            size='large'
            onClick={props.onClick}
        >
            <MetamaskIcon width={120} height={30} />
        </Button>
    )
};

export default MetamaskButton