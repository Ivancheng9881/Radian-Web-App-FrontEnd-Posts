import { Menu } from "antd";
import { FC } from "react";

interface PageProps {
    title: string
}


const CustomSubMenu : FC<PageProps> = ({children, title}) => {
    return (
        <div>
            <Menu.Item>{title}</Menu.Item>
            {children}
        </div>
    )
};

export default CustomSubMenu;