import { Select, Typography } from "antd";
import { FC, useContext } from "react";
import LinkWalletContext from "../context/linkWallet.context";
import { LinkWalletContextType } from "../context/linkWallet.interface";
import LinkProfileFormWrapper from "./wrapper.components";

const styles = {
    select: {
        width: 300
    }
} as const;

const LinkProfileSelectProvider : FC = (props) => {

    const { newWallet, setNewWallet, setStep, step } : LinkWalletContextType = useContext(LinkWalletContext);

    const handleChange = (val: string) => {
        setNewWallet({
            ...newWallet,
            network: val,
        });
        setStep(step+1)
    }

    return (
        <LinkProfileFormWrapper >
            <Typography.Title level={4}>
                Select the provider of the wallet you want to connect to
            </Typography.Title>
            <Select 
                style={styles.select}
                value={newWallet.network}
                onChange={handleChange}
                placeholder='Select the wallet provider'
            >
                <Select.Option key={'metamask'} >Metamask</Select.Option>
                <Select.Option key={'solana'} >Solana</Select.Option>
            </Select>
        </LinkProfileFormWrapper>
    )
};

export default LinkProfileSelectProvider;