import { useEffect, useState } from "react";
import SolanaContext from "./solana.context"


const SolanaProvider = ({children}) => {

    const [ provider, setProvider ] = useState(null);
    const [ wallet, setWallet ] = useState(null);

    useEffect(() => {
        // handle solana wallet eager connection
        if (window.solana?.isPhantom) {
            window.solana.connect({onlyIfTrusted: true })
                .then(({publicKey}) => {
                    setProvider('phantom@solana');
                    setWallet(publicKey);
                })
                .catch((err) => {
                    console.error(err);
                } )
        }
    }, [])

    useEffect(() => {
        window.solana?.on('connect', handleConnectEvent)
    }, []);

    const handleConnectEvent = () => {
        console.log('connected')
    }

    const connectProvider = async () => {
        if (window.solana?.isPhantom) {
            const resp = await window.solana.connect();
            if (resp) {
                setProvider('phantom@solana');
                setWallet(resp.publicKey);
                return resp.publicKey
            }
        }
    };

    const providerValue = {
        connect: connectProvider,
        provider: provider,
        wallet: wallet
    };

    return (
        <SolanaContext.Provider value={providerValue}>
            {children}
        </SolanaContext.Provider>
    )
};

export default SolanaProvider;