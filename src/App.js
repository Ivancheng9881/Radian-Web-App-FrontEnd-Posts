import Router from "./router";
import SolanaWalletProvider from "./utils/web3/context/solanaWallet.provider";
import Web3Provider from "./utils/web3/context/web3.provider";
import GlobalSnackBarProvider from './page/start/context/snackbar/snackbar.provider';

function App() {
    return (
        <SolanaWalletProvider>
            <Web3Provider>
                <GlobalSnackBarProvider>
                    <Router />
                </GlobalSnackBarProvider>
            </Web3Provider>
        </SolanaWalletProvider>

    );
}

export default App;
