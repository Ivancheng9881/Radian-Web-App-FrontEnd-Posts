import { Select, Typography } from "antd";
import { FC, useContext } from "react";
import Web3Context from "../../../../utils/web3/context/web3.context";
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
    const { providers, connect } = useContext(Web3Context);

    const handleChange = async (val: string) => {        
        /**
         * if target provider != current provider 
         * handle switch provider for user
         */
        val = val.toLowerCase();
        let existingProviders = providers?.selected?.split('@');

        if (existingProviders[0] != val) {
            let _providers = ''; 
            if (val == 'metamask') {
                _providers = 'erc'
            } else if (val == 'phantom') {
                _providers = 'solana'
            };

            const response = await handleSwitchProvider(_providers)
            if (response) {
                setNewWallet({
                    ...newWallet,
                    network: val,
                });
                setStep(step+1)
            }
        } else {
            setNewWallet({
                ...newWallet,
                network: val,
            });
            setStep(step+1)
        }
        
    };

    const handleSwitchProvider = async (network: string) => {
        try {
            return await connect(network.toLowerCase());
        } catch(err) {
            console.log(err);
        }
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
                <Select.Option key={'phantom'} >Phantom</Select.Option>
            </Select>
        </LinkProfileFormWrapper>
    )
};

export default LinkProfileSelectProvider;