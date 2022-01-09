import Router from "./router";
import Web3Provider from "./utils/web3/context/web3.provider";

function App() {
  return (
    <Web3Provider>
      <Router />
    </Web3Provider>
  );
}

export default App;
