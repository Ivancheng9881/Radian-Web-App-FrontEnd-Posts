import { Menu, Typography } from "antd";
import { FC, useContext } from "react";
import Web3Context from "../../../utils/web3/context/web3.context";
import { Web3ProviderType } from "../../../utils/web3/context/web3.interface";
import MetamaskSquareIcon from "../../Icons/MetamaskSquare.components";
import PhantomSquareIcon from "../../Icons/PhantomSquare.components";

const NavBarWalletPopOverContent : FC = () => {
    const web3Proivder : Web3ProviderType = useContext(Web3Context); 

    const handleConnectMetamask = async () => {
        await web3Proivder.connect('erc');
    }

    return (
        <Menu className="rd-navbar-wallet-title">
            <Menu.Item onClick={handleConnectMetamask}>
                <MetamaskSquareIcon />
                <Typography.Title level={5}>Metamask</Typography.Title> 
            </Menu.Item>
            {/* <Menu.Item>
                <PhantomSquareIcon /> 
                <Typography.Title level={5}>Phantom</Typography.Title> 
            </Menu.Item> */}
        </Menu>
    )
};

export default NavBarWalletPopOverContent;