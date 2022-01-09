import { PublicKey } from '@solana/web3.js'

const publicKeyToString = (bn) => {
    const publicKey = new PublicKey(bn);
    return publicKey.toString();
}

const parser = {
    publicKeyToString,
};

const SolanaUtils = {
    parser,
}

export default SolanaUtils;