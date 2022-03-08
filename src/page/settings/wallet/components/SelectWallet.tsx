import { Button, Input, Select, Typography } from "antd";
import { FC, useContext, useEffect } from "react";
import Web3Context from "../../../../utils/web3/context/web3.context";
import { truncateAddress } from "../../../../utils/web3/general/parser.utils";
import LinkWalletContext from "../context/linkWallet.context";
import { LinkWalletContextType } from "../context/linkWallet.interface";
import LinkProfileFormWrapper from "./wrapper.components";

const styles = {
    text: {
        textAlign: 'center'
    }
} as const;

const LinkProfileSelectWallet : FC = (props) => {

    const { newWallet, setNewWallet, targetProfile, setStep, step, objKey } : LinkWalletContextType = useContext(LinkWalletContext);
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
            <Typography.Title level={3} style={styles.text}>We need to confirm your new address</Typography.Title>
            <Typography.Title level={4}>Open {newWallet.network} and change to the address you want to add.</Typography.Title>
            <Typography.Title level={4} style={styles.text}>
                Is this the new address you want to add?<br/>
                {truncateAddress(newWallet.address, 16)}
            </Typography.Title>
            <Button 
                onClick={handleClick}
                type='primary'
                shape="round"
                size="large"
                disabled={newWallet.address === targetProfile.address}
            >
                {newWallet.address === targetProfile.address ? 'Remember to change the address you stupid ass' :'Confirm'}
            </Button>
        </LinkProfileFormWrapper>
    )
};

export default LinkProfileSelectWallet;