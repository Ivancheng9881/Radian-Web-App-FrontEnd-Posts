import { Menu, Typography } from "antd";
import { FC } from "react";
import MetamaskSquareIcon from "../../Icons/MetamaskSquare.components";
import PhantomSquareIcon from "../../Icons/PhantomSquare.components";


const NavBarWalletPopOverContent : FC = () => {

    return (
        <Menu className="rd-navbar-wallet-title">
            <Menu.Item >
                <MetamaskSquareIcon />
                <Typography.Title level={5}>Metamask</Typography.Title> 
            </Menu.Item>
            <Menu.Item>
                <PhantomSquareIcon /> 
                <Typography.Title level={5}>Phantom</Typography.Title> 
            </Menu.Item>
        </Menu>
    )
};

export default NavBarWalletPopOverContent;