import { Button } from "antd";
import { FC } from "react";
import { FixLater } from "../../schema/helper.interface";
import PhantomIcon from "../Icons/phantom.components";

interface PropsType {
    onClick: FixLater
}

const PhantomButton : FC<PropsType> = (props) => {

    return (
        <Button 
            type="primary"
            shape='round'
            size='large'
            onClick={props.onClick}

        >
            <PhantomIcon width={120} height={30} />
        </Button>
    )
};

export default PhantomButton