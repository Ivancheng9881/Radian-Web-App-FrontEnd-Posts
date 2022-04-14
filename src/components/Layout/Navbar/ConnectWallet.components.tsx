import { Button, Dropdown, Menu, Popover } from "antd";
import { FC } from "react";
import NavBarWalletPopOverContent from "./ConnectWalletPopOverContent.components";


const NavBarWalletPopOver : FC = () => {

    return (
        <Dropdown overlay={<NavBarWalletPopOverContent />} placement='bottomCenter' trigger={['click']}>
            <Button 
                shape='round' 
                size='large' 
                type='primary' 
                onClick={e => e.preventDefault()}
                // onClick={handleWalletButtonClick} 
            >
                Connect
            </Button>
        </Dropdown>
    )
};

export default NavBarWalletPopOver;