import { Menu, Typography } from "antd";
import React, { FC } from "react";
import { useHistory } from "react-router";

interface PropsType {
    route?: string,
    onClick?: any
};

const styles = {
    item: {
        width: '100%',
    }
} as const;

const CustomMenuItem : FC<PropsType> = (props) => {

    const history = useHistory();

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        // injected onClick function can override handleClick function
        if (props.onClick) return props.onClick();
        
        history.push(props.route);
    }


    return (
        <span onClick={handleClick} style={styles.item}>
            <Menu.Item key={props.route} >
                <Typography.Text strong={history.location.pathname === props.route} >
                    {props.children}
                </Typography.Text>
            </Menu.Item>
        </span>
    )
};

export default CustomMenuItem;