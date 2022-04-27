import { Button, Dropdown, Menu, Popover } from "antd";
import { FC, useContext } from "react";
import { useHistory } from "react-router";
import Web3Context from "../../../utils/web3/context/web3.context";
import { truncateAddress } from "../../../utils/web3/general/parser.utils";
import NavBarWalletPopOverContent from "./ConnectWalletPopOverContent.components";
import { PASSPORT_ME_ROUTE } from "../../../commons/route";


const NavBarWalletPopOver : FC = () => {

    const { providers } = useContext(Web3Context);
    const history = useHistory();

    return (
        <>
        {providers.selected
        ? <Button 
            shape='round' 
            size='large' 
            type='primary' 
            className='rd-wallet-connected'
            onClick={e => history.push(PASSPORT_ME_ROUTE)}
        >
            {truncateAddress(providers[providers.selected])}
        </Button>
        : <Dropdown 
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
                Connect
            </Button>
        </Dropdown>}
        </>
    )
};

export default NavBarWalletPopOver;