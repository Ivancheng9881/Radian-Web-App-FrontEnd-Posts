import { Button } from "antd";
import { FC, useContext } from "react";
import WalletPopupContext from "../../../utils/WalletPopup/context/walletPopup.context";
import { WalletPopupContextType } from "../../../utils/WalletPopup/context/walletPopup.interface";
import Web3Context from "../../../utils/web3/context/web3.context";
import FullProfileFrame from "./Frame.components";

const styles = {
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
} as const;


const FullPendingLogin : FC = (props) => {

    const web3Context = useContext(Web3Context);
    const walletPopupContext: WalletPopupContextType = useContext(WalletPopupContext)

    const connectWallet = () => {
        walletPopupContext.setOpen(true);
    }

    return (
        <FullProfileFrame>
            <div style={styles.root}>
                    <Button 
                        size='large' 
                        type='primary' 
                        shape='round'
                        onClick={connectWallet}
                    >
                        Connect wallet
                    </Button>
            </div>
        </FullProfileFrame>
    )
};

export default FullPendingLogin;