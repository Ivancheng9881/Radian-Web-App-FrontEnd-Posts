import { Menu, Typography } from "antd";
import React, { FC } from "react";
import { useHistory } from "react-router";

interface PropsType {
    route?: string,
    onClick?: any
}

const CustomMenuItem : FC<PropsType> = (props) => {

    const history = useHistory();

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        // injected onClick function can override handleClick function
        if (props.onClick) return props.onClick();
        
        history.push(props.route);
    }


    return (
        <Menu.Item>
            <Typography.Text 
                strong={history.location.pathname === props.route} 
                onClick={handleClick} 
            >
                {props.children}
            </Typography.Text>
        </Menu.Item>
    )
};

export default CustomMenuItem;