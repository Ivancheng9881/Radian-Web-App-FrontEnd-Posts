import idl from './idl.json';
import { web3 } from "@project-serum/anchor";
import SolanaUtils from '../../../context/solana.utils';
import { PhantomWalletAdapter, PhantomWalletName } from '@solana/wallet-adapter-wallets';

export const profileContract__sol__abi = idl;
export const profileContract__sol__address = 'BPnV7ofoFnpkaDPUX97gJw5zjQGjPRnvaviUEkjgthij';

const DAO_ACCOUNT_SEED = "dao_authority_account_2";
const PROFILE_MAPPING_ACCOUNT_SEED = "profile_mapping_account_2";

async function initProfileProgram(wallet) {

    return await SolanaUtils.getProgram(
        profileContract__sol__abi,
        profileContract__sol__address,
        wallet,
    )
};

async function getProfileMappingPDA(programId, userPublicKey) {
    userPublicKey = userPublicKey.toBytes()
    console.log(userPublicKey)
    return await web3.PublicKey.findProgramAddress([
        PROFILE_MAPPING_ACCOUNT_SEED,
        userPublicKey,
      ], programId);
}

async function getDaoAccountPDA(programId) {
    return await web3.PublicKey.findProgramAddress([
        DAO_ACCOUNT_SEED
      ], programId);
}

export async function createProfileSolana(wallet) {
    let {program, provider} = await initProfileProgram(wallet);
    console.log(provider.wallet)
    if (!provider.wallet.connected) {
        // let phamtomWallet = new PhantomWalletAdapter()
        // let connect = await phamtomWallet.connect();
        provider.wallet.select(PhantomWalletName);
        await provider.wallet.connect()
    }
    let [ profileMappingPDA, profileMappingBump ] = await getProfileMappingPDA(program.programId, provider.wallet.publicKey);
    let [ daoAccountPDA, daoAccountBump ] = await getDaoAccountPDA(program.programId);

    try {
        let resp = await program.rpc.createProfileMapping(profileMappingBump, {
            accounts: {
                daoaccount: daoAccountPDA,
                profileMapping: profileMappingPDA,
                user: provider.wallet.publicKey,
                systemProgram: web3.SystemProgram.programId
            },
            signer: [],
        });
        console.log(resp)
    } catch(err) {
        console.log(err);
    }
    return await initProfileProgram();
}