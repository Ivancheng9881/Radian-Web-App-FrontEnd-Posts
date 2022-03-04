import { Modal, Space } from "antd";
import { useContext, useEffect } from "react";
import { FC } from "react";
import WalletPopupContext from "../../utils/WalletPopup/context/walletPopup.context";
import ERCUtils from "../../utils/web3/context/erc.utils";
import Web3Context from "../../utils/web3/context/web3.context";
import { Web3ProviderType } from "../../utils/web3/context/web3.interface";
import MetamaskButton from "../Button/MetamaskButton.components";
import PhantomButton from "../Button/PhantomButton.components";

const styles = {
    space: {
        width: '100%',
        textAlign: 'center'
    }
} as const;

const ConnectWalletPopup : FC = (props) => {
    
    const web3Context: Web3ProviderType = useContext(Web3Context);
    const { open, setOpen } = useContext(WalletPopupContext);

    const onPhantomClick = async () => {
        const resp = await web3Context.connect('solana');
        setOpen(false);
    };

    const onMetamaskClick = async () => {
        const resp = await web3Context.connect('erc');
        setOpen(false);
    };

    const onCancel = (e: any) => {
        setOpen(false);
    }

    return (
        <Modal 
            visible={open}
            title='Connect Wallet'
            footer={null}
            onCancel={onCancel}
        >
            <Space direction="vertical" style={styles.space} >
                <MetamaskButton onClick={onMetamaskClick} />
                <PhantomButton onClick={onPhantomClick} />
            </Space>
        </Modal>
    )
};

export default ConnectWalletPopup;