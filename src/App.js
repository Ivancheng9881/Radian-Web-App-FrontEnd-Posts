import Router from "./router";
import SolanaWalletProvider from "./utils/web3/context/solanaWallet.provider";
import Web3Provider from "./utils/web3/context/web3.provider";
import UserProfile from "./utils/user/context/user.provider";
import WalletPopupProvider from "./utils/WalletPopup/context/walletPopup.provider";

import './styles/main.css';
import './styles/app.less';
import { useEffect } from "react";
import searchEngineClient from "./utils/web3/searchEngine";
import { ApolloProvider } from "@apollo/client";
import SplashScreenProvider from "./utils/SplashScreenContext/Splash.provider";

function App() {

    useEffect(() => {
        document.title = 'Radian'
    }, []);
    
    return (
        <ApolloProvider client={searchEngineClient} >
            <SplashScreenProvider>
                <SolanaWalletProvider>
                    <WalletPopupProvider>
                        <Web3Provider>
                            <UserProfile >
                                <Router/>
                            </UserProfile>
                        </Web3Provider>
                    </WalletPopupProvider> 
                </SolanaWalletProvider>
            </SplashScreenProvider>
        </ApolloProvider>
    );
}

export default App;
