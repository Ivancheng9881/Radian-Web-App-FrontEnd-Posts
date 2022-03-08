import { Button, Input, Select, Typography } from "antd";
import { FC, useContext, useEffect } from "react";
import Web3Context from "../../../../utils/web3/context/web3.context";
import { truncateAddress } from "../../../../utils/web3/general/parser.utils";
import LinkWalletContext from "../context/linkWallet.context";
import { LinkWalletContextType } from "../context/linkWallet.interface";
import LinkProfileFormWrapper from "./wrapper.components";

const styles = {
    select: {
        width: 300
    }
} as const;

const LinkProfileSelectOriginWallet : FC = (props) => {

    const { newWallet, setNewWallet, setStep, step, objKey } : LinkWalletContextType = useContext(LinkWalletContext);
    const web3Context = useContext(Web3Context);

    useEffect(() => {
        if (web3Context.providers?.selected == objKey.metamask) {
            setNewWallet({
                ...newWallet,
                address: web3Context.providers[web3Context.providers.selected]
            })
        }
    }, [web3Context.providers]);

    const handleClick = () => {
        setStep(step+1);
    } 

    return (
        <LinkProfileFormWrapper >
            <Typography.Title level={4}>
                We need your confirmation from the new wallet.
                Open {newWallet.network} and change to the wallet you are connecting
            </Typography.Title>
            <Typography.Title level={5} >Is this the wallet you are connecting?</Typography.Title>
            <Input 
                size='large'
                disabled
                value={truncateAddress(newWallet.address, 16)}
            />
            <Button 
                onClick={handleClick}
                type='primary'
                shape="round"
                size="large"
            >
                Confirm
            </Button>
        </LinkProfileFormWrapper>
    )
};

export default LinkProfileSelectOriginWallet;