import { useState } from "react";
import { FC } from "react";
import WalletPopupContext from "./walletPopup.context";
import { WalletPopupContextType } from "./walletPopup.interface";

const WalletPopupProvider : FC = (props) => {

    const [ open, setOpen ] = useState<boolean>(false);

    const value : WalletPopupContextType = {
        open: open,
        setOpen: setOpen
    }

    return (
        <WalletPopupContext.Provider value={value} >
            {props.children}
        </WalletPopupContext.Provider>
    )
};

export default WalletPopupProvider;