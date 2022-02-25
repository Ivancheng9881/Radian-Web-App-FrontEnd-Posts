import Router from "./router";
import SolanaWalletProvider from "./utils/web3/context/solanaWallet.provider";
import Web3Provider from "./utils/web3/context/web3.provider";
import GlobalSnackBarProvider from './page/start/context/snackbar/snackbar.provider';
import ProfileProvider from "./utils/profile/context/profile.provider";
import './styles/main.css';
import './styles/app.less'

function App() {
    return (
        <GlobalSnackBarProvider>
            <SolanaWalletProvider>
                <Web3Provider>
                    <ProfileProvider>
                        <Router/>
                    </ProfileProvider>
                </Web3Provider>
        </SolanaWalletProvider>
    </GlobalSnackBarProvider>
    );
}

export default App;
