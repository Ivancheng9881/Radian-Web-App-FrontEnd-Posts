import { Button } from "antd";
import { FC } from "react";
import config from "../../commons/config";
import { FixLater } from "../../schema/helper.interface";

interface PropsType {
    onClick?: FixLater
    theme?: 'dark' | 'light'
};

const MetamaskButton : FC<PropsType> = ({
    onClick,
    theme='dark'
}) => {

    return (
        <Button 
            className="rd-btn-custom-icon"
            type={ theme === 'dark' ? 'primary' : 'default' }
            shape='round'
            size='large'
            // onClick={props.onClick}
        >
            <img src={`${config.assets.cdn}/icon/metamask_square.png`} /> Metamask
        </Button>
    )
};

export default MetamaskButton