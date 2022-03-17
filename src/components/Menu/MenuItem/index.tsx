import { Menu, Typography } from "antd";
import React, { FC } from "react";
import { useHistory } from "react-router";
import { StyleSheet } from "../../../schema/helper.interface";

interface PropsType {
    route?: string,
    onClick?: any,
    isSubItem?: boolean
};


const CustomMenuItem : FC<PropsType> = (props) => {

    const history = useHistory();

    const styles: StyleSheet = {
        item: {
            width: '100%',
            paddingLeft: props.isSubItem ? '32px' : '16px'
        }
    };
    

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        // injected onClick function can override handleClick function
        if (props.onClick) return props.onClick();
        
        history.push(props.route);
    }


    return (
        <span onClick={handleClick} style={styles.item}>
            <Menu.Item key={props.route} style={styles.item} >
                <Typography.Text strong={history.location.pathname === props.route} >
                    {props.children}
                </Typography.Text>
            </Menu.Item>
        </span>
    )
};

export default CustomMenuItem;