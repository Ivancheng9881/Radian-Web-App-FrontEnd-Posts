import Router from "./router";
import SolanaWalletProvider from "./utils/web3/context/solanaWallet.provider";
import Web3Provider from "./utils/web3/context/web3.provider";

function App() {

  return (
    <SolanaWalletProvider>
      <Web3Provider>
        <Router />
      </Web3Provider>
    </SolanaWalletProvider>
  );
}

export default App;
