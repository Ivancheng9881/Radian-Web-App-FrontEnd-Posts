// import { useWallet } from '@solana/wallet-adapter-react';
import { Program, Provider } from '@project-serum/anchor';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletName } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js'

const opts = {
    preflightCommitment: "processed"
}

const numberToBytes = (number) => {
    if (number <= 1) {
        const byteArray = new Uint8Array(1);
        byteArray[0] = number;
        return byteArray;
    }
    // you can use constant number of bytes by using 8 or 4
    const len = Math.ceil(Math.log2(number) / 8);
    const byteArray = new Uint8Array(len);

    for (let index = byteArray.length - 1; index >= 0; index--) {
        const byte = number & 0xff;
        byteArray[index] = byte;
        number = (number - byte) / 256;
    }

    return byteArray;
}


const publicKeyToString = (bn) => {
    const publicKey = new PublicKey(bn);
    // console.log(publicKey)
    return publicKey
};

const connectWallet = async (wallet) => {
    console.log('connecting solana wallet', wallet);
    let { publicKey } = await window.solana.connect();
    console.log(publicKey);
    // wallet.select(PhantomWalletName);s
    if (publicKey) {
        console.log('connected wallet:', publicKey, wallet)

        // await wallet.connect().then(res => console.log('Wallet Info:', wallet))
        return publicKey;
    } else {
        return undefined
    }
};

const isConnected = async (wallet, callback) => {
    if (wallet.isConnected) {
        return true
    } else {
        let publicKey = await connectWallet(wallet);
        console.log('Wallet isConnected', publicKey)
        if (publicKey) {
            return true
        } else {
            return false
        }
    }
}

const selectProvider = (provider) => {
    switch (provider) {
        case 'phantom':
        default:
            return PhantomWalletName
    }
}

// const connectWallet = async (wallet, provider) => {
//     // select provider
//     provider = selectProvider(provider);
//     wallet.select(provider);

//     try {
//         let connection = await wallet.connect();
//         console.log(connection);
//         return connection;
//     } catch(err) {
//         console.log(err);

//     }
// }

const disconnectWallet = async (wallet) => {
    return await wallet.disconnect();
}

const getConnection = () => {
    let network = WalletAdapterNetwork.Devnet;
    const connection = new Connection(clusterApiUrl(network), opts.preflightCommitment);
    console.log('connection status:', connection)
    return connection;
}

const getProvider = async (wallet) => {
    let connection = getConnection();
    let provider = new Provider(connection, wallet, opts.preflightCommitment);
    console.log('getting solana provider:', provider)
    return provider;
}

const getProgram = async (idl, programId, wallet) => {
    let provider = await getProvider(wallet)
    let program = new Program(idl, programId, provider);
    return { program, provider }
}

const parser = {
    publicKeyToString,
};

const SolanaUtils = {
    parser,
    numberToBytes,
    getProvider,
    getProgram,
    isConnected,
    connectWallet,
    disconnectWallet,
}

export default SolanaUtils;