import Router from "./router";
import SolanaWalletProvider from "./utils/web3/context/solanaWallet.provider";
import Web3Provider from "./utils/web3/context/web3.provider";
import GlobalSnackBarProvider from './page/start/context/snackbar/snackbar.provider';

function App() {
    return (
        <GlobalSnackBarProvider>
            <SolanaWalletProvider>
                <Web3Provider>
                    <Router/>
                </Web3Provider>
        </SolanaWalletProvider>
    </GlobalSnackBarProvider>
    );
}

export default App;
