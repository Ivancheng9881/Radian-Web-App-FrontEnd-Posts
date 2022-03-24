import { Menu, Typography } from "antd";
import React, { FC } from "react";
import { useHistory } from "react-router";
import { StyleSheet } from "../../../schema/helper.interface";

interface PropsType {
    route?: string,
    onClick?: any,
    isSubItem?: boolean,
    disabled?: boolean
};

const CustomMenuItem : FC<PropsType> = ({
    children,
    route,
    onClick,
    isSubItem,
    disabled=false,
}) => {

    const history = useHistory();

    const styles: StyleSheet = {
        item: {
            width: '100%',
            paddingLeft: isSubItem ? '32px' : '16px',
        }
    };    

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (disabled) return;
        // injected onClick function can override handleClick function
        if (onClick) return onClick();
        
        history.push(route);
    }


    return (
        <span onClick={handleClick} style={styles.item}>
            <Menu.Item key={route} style={styles.item} disabled={disabled} >
                <Typography.Text disabled={disabled} strong={history.location.pathname === route} >
                    {children}
                </Typography.Text>
            </Menu.Item>
        </span>
    )
};

export default CustomMenuItem;