import { FC, useContext, useState } from "react";
import LinkWalletProvider from "./context/linkWallet.provider";
import LinkProfileBody from "./body";

const WalletSettings: FC = () => {

    return (
        <LinkWalletProvider>
            <LinkProfileBody />
        </LinkWalletProvider>
    )
};

export default WalletSettings;