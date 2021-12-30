import Router from "./router";
import SolanaProvider from "./utils/web3/solana/solana.provider";

function App() {
  return (
    <SolanaProvider>
      <Router />
    </SolanaProvider>
  );
}

export default App;
