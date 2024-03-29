import { Button } from "antd";
import { FC, useContext } from "react";
import { useHistory } from "react-router";
import { createProfileRoute } from "../../../commons/route";
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


const FullPendingCreate : FC = (props) => {

    const walletPopupContext: WalletPopupContextType = useContext(WalletPopupContext)
    const history = useHistory();

    const routeToCreateProfile = () => {
        history.push(createProfileRoute);
    }

    return (
        <FullProfileFrame>
            <div style={styles.root}>
                    <Button 
                        size='large' 
                        type='primary' 
                        shape='round'
                        onClick={routeToCreateProfile}
                    >
                        Create Profile
                    </Button>
            </div>
        </FullProfileFrame>
    )
};

export default FullPendingCreate;