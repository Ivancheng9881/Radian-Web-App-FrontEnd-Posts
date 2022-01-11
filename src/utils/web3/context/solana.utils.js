// import { useWallet } from '@solana/wallet-adapter-react';
import { Program, Provider } from '@project-serum/anchor';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js'

const opts = {
    preflightCommitment: "processed"
}
  
const publicKeyToString = (bn) => {
    const publicKey = new PublicKey(bn);
    console.log(publicKey)
    return publicKey
};

const getWallet = async () => {
    console.log(window.solana)
    let {publicKey} = await window.solana.connect();
    if (publicKey) {
        return publicKey;
    } else {
        return undefined
    }
}

const getConnection = () => {
    let network = WalletAdapterNetwork.Devnet;
    const connection = new Connection(clusterApiUrl(network), opts.preflightCommitment);
    return connection;
}

const getProvider = async (wallet) => {
    let connection = getConnection();
    let provider = new Provider(connection, wallet, opts.preflightCommitment);
    return provider;
}

const getProgram = async (idl, programId, wallet) => {
    let provider = await getProvider(wallet)
    let program = new Program(idl, programId, provider);
    return {program, provider}
}

const parser = {
    publicKeyToString,
};

const SolanaUtils = {
    parser,
    getWallet,
    getProvider,
    getProgram,
}

export default SolanaUtils;