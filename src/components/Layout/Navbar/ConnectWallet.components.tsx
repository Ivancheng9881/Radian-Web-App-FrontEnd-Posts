import { Button, Dropdown, Menu, Popover } from "antd";
import { FC, useContext } from "react";
import Web3Context from "../../../utils/web3/context/web3.context";
import { truncateAddress } from "../../../utils/web3/general/parser.utils";
import NavBarWalletPopOverContent from "./ConnectWalletPopOverContent.components";


const NavBarWalletPopOver : FC = () => {

    const { providers } = useContext(Web3Context);

    return (
        <Dropdown 
            overlay={<NavBarWalletPopOverContent />} 
            placement='bottomCenter' 
            trigger={['click']}
        >
            <Button 
                shape='round' 
                size='large' 
                type='primary' 
                onClick={e => e.preventDefault()}
            >
                {providers?.selected ? truncateAddress(providers[providers.selected])  : 'Connect'}
            </Button>
        </Dropdown>
    )
};

export default NavBarWalletPopOver;