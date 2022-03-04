import Router from "./router";
import SolanaWalletProvider from "./utils/web3/context/solanaWallet.provider";
import Web3Provider from "./utils/web3/context/web3.provider";
import GlobalSnackBarProvider from './page/start/context/snackbar/snackbar.provider';
import UserProfile from "./utils/user/context/user.provider";
import WalletPopupProvider from "./utils/WalletPopup/context/walletPopup.provider";

import './styles/main.css';
import './styles/app.less'

function App() {
    return (
        <GlobalSnackBarProvider>
            <SolanaWalletProvider>
                <WalletPopupProvider>
                    <Web3Provider>
                        <UserProfile >
                            <Router/>
                        </UserProfile>
                    </Web3Provider>
                </WalletPopupProvider> 
        </SolanaWalletProvider>
    </GlobalSnackBarProvider>
    );
}

export default App;
