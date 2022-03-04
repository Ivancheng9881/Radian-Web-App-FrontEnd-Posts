import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { FC } from "react";
import { FixLater } from "../../../../../schema/helper.interface";

interface PropsType {
    visible: boolean,
    onClick: FixLater,
}

const VisibilityIconButton : FC<PropsType> = (props) => {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        props.onClick();
    }

    return (
        <Button
            onClick={handleClick}
            size='large' 
            icon={
                props.visible 
                ? <EyeOutlined />
                : <EyeInvisibleOutlined />
            }
        />
    )
};

export default VisibilityIconButton;