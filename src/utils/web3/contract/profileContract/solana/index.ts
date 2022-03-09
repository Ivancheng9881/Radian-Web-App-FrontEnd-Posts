import idl from './idl.json';
import { web3, Program, Provider } from "@project-serum/anchor";
import SolanaUtils from '../../../context/solana.utils';
// import { TextDecoder } from "web-encoding";
import { FixLater } from '../../../../../schema/helper.interface';
import { encodeUint8Array } from '../../../general/parser.utils';
import { SolanaAddressNumber, SolanaContentID, SolanaProfile, SolanaProfileID, SolanaProgram, SolanaSeedBuffer } from './index.interface';
import { WalletContextState } from '@solana/wallet-adapter-react';
import ErrorHandler from '../../../../errorHandler';
import BN from 'bn.js';
import { SystemProgram } from '@solana/web3.js';



export const profileContract__sol__abi: FixLater = idl;
export const profileContract__sol__address: string = 'Erd5sdn3uuUY7Xcu6NgWC8n5zAiTPsZcd5wSqfpEXRdd';

const DAO_ACCOUNT_SEED: SolanaSeedBuffer = encodeUint8Array("dao_authority_account");
const PROFILE_MAPPING_ACCOUNT_SEED: SolanaSeedBuffer = encodeUint8Array("profile_mapping_account");
const PROFILE_ACCOUNT_SEED: SolanaSeedBuffer = encodeUint8Array("profile_");
const SEARCH_ACCOUNT_SEED: SolanaSeedBuffer = encodeUint8Array("search__");

// create a fake user for getting data using the rpc api, so that user does not need to connect to provider
// function createFakeUser() {
//     let user = web3.Keypair.generate();
//     let wallet = new anchor.Wallet(user);
//     return wallet;
// }


export async function getProfileListCountSolana(
    provider: Provider
    ): Promise<number> {
    const program = new Program(profileContract__sol__abi, profileContract__sol__address, provider);
    const [dao_account, dao_bump] = await web3.PublicKey.findProgramAddress([
        DAO_ACCOUNT_SEED
      ], program.programId);
    
    const daoAccount = await program.account.daoAccount.fetch(dao_account);
    const profileCount = daoAccount.profileCount.toNumber();
    return profileCount;
}

// get connected addresses
export async function getProfileAddressListSolana(
    profileID: SolanaProfileID, 
    addressNumber: SolanaAddressNumber, 
    provider: FixLater
    ) : Promise<FixLater> {
    let addresses = [];
    const program = new Program(profileContract__sol__abi, profileContract__sol__address, provider);
    for ( let i = 0 ; i < addressNumber ; i++ ) {
        let [searchPDA, searchBump] = await getSearchAccountPDA(program.programId, profileID, i);
        addresses.push(await program.account.searchMapping.fetch(searchPDA));
    }
    return addresses;
}

export async function getFullProfileFromIDSolana(
    profileID: SolanaProfileID, 
    provider: FixLater
    ) : Promise<FixLater> {
    let profile = await getProfileFromIDSolana(profileID, provider);
    console.log('solanautils', profile)
    const addresses = await getProfileAddressListSolana(profileID, profile.addressNumber, provider);
    profile.addresses = addresses;
    return profile;
}

export async function getProfileFromIDSolana(
    profileID: SolanaProfileID, 
    provider: FixLater
    ) : Promise<SolanaProfile | undefined> {
    const program = new Program(profileContract__sol__abi, profileContract__sol__address, provider);
    let [profilePDA, profileBump] = await getProfilePDA(program.programId, profileID);
    try {
        let profile = await program.account.profile.fetch(profilePDA);
        let profileData = decodeProfileData(profile);
        profileData.profileID = profileID;
        profileData.network = 'Solana'
        return profileData;
    } catch(err) {
        return undefined;
    }
}

// get the most recent x profiles from solana
export async function getProfileListSolana(
    limit: number, 
    provider: Provider
    ) : Promise<SolanaProfile[]> {

    let ids: number[] = []
    for ( let i : number = limit ; i >= 1 ; i-- ) ids.push(i);

    const promises = ids.map((id) => {
        return new Promise(async (resolve, rejects) => {
            getProfileFromIDSolana(id, provider)
                .then((res) => resolve(res))
                .catch((err) => rejects(err))
        })
    })

    let profiles: any = (await Promise.all(promises)).filter((p) => p != undefined);
    return profiles;
}

function encodeProfileID(
    profileID: SolanaProfileID
    ) : Uint8Array {
    const input = new Uint8Array(8);
    const array = SolanaUtils.numberToBytes(profileID);
    const array_length = array.length;
    input.set(array, 8 - array_length);
    return input;
};

function encodeContentID(
    cid: SolanaContentID
    ) : Uint8Array {
    const input = new Uint8Array(64);
    const encoder = new TextEncoder();
    const encoded_string = encoder.encode(cid);
    const array_length = encoded_string.length;
    input.set(encoded_string, 64 - array_length);
    return input;
}

function decodeContentID(
    cidArray: SolanaContentID[],
    ) {
    let end = 0;
    cidArray.forEach((c: SolanaContentID, idx) => {
        if (c == 0) {
            end = idx
        }
    });
    const slicedArray = cidArray.slice(end + 1, cidArray.length);
    let cid = String.fromCharCode.apply(null, slicedArray);
    return cid
}

function decodeProfileData(profileData: FixLater) {
    profileData.addressNumber = profileData.addressNumber.toNumber();
    profileData.identityID = decodeContentID(profileData.identityId);
    return profileData;
}

async function initProfileProgram(
    wallet: FixLater, 
    bypassWallet = false
    ) {
    if (bypassWallet){
        return await SolanaUtils.getProgram(
            profileContract__sol__abi,
            profileContract__sol__address
        );
    }
    let isConnected = await SolanaUtils.isConnected(wallet)
    if (!isConnected) {
        return {}
    }
    return await SolanaUtils.getProgram(
        profileContract__sol__abi,
        profileContract__sol__address,
        wallet,
    )
};

async function getProgramAddress(
    programId: Program["programId"], 
    args: FixLater
    ) {
    return await web3.PublicKey.findProgramAddress(args, programId);
}

async function getProfileMappingPDA(
    programId: Program["programId"], 
    wallet: FixLater
    ) {
    let userPublicKey = wallet.publicKey ? wallet.publicKey.toBytes() : wallet.toBytes();
    return await web3.PublicKey.findProgramAddress([
        PROFILE_MAPPING_ACCOUNT_SEED,
        userPublicKey,
    ], programId);
}

async function getProfilePDA(
    programId: Program["programId"], 
    profileId: SolanaProfileID
    ) {
    return await web3.PublicKey.findProgramAddress([
        PROFILE_ACCOUNT_SEED,
        encodeProfileID(profileId)
    ], programId);
}

async function getDaoAccountPDA(
    programId: Program["programId"], 
    ) {
    return await web3.PublicKey.findProgramAddress([
        DAO_ACCOUNT_SEED
    ], programId);
}

async function getSearchAccountPDA(
    programId: Program["programId"], 
    profileId: SolanaProfileID, 
    addressNumber: number = 0
    ) {

    return await getProgramAddress(programId, [
        SEARCH_ACCOUNT_SEED,
        encodeProfileID(profileId),
        encodeProfileID(addressNumber)
    ]);
}

async function fetchProfileMappingSolana(
    program: Program, 
    provider: Provider
    ) {
    try {
        let [profileMappingPDA, profileMappingBump] = await getProfileMappingPDA(program.programId, provider.wallet);
        let profileMapping = await program.account.profileMapping.fetch(profileMappingPDA);
        return profileMapping;
    } catch (err) {
        throw(ErrorHandler(4200))
    }
};

async function fetchProfileSolana(
    program: Program, 
    provider: Provider
    ) {
       
    let profileMapping
    try {
        profileMapping = await fetchProfileMappingSolana(program, provider);
        // only fetch profile when profileMapping exists
        let [profilePDA, profileBump] = await getProfilePDA(program.programId, profileMapping.profileId.toNumber());
        let profile = await program.account.profile.fetch(profilePDA);
        return [profileMapping, profile]
    } catch (err: any) {
        throw(ErrorHandler(4200));
    }
}

export async function createProfileMappingSolana(
    wallet: FixLater
    ) {
    let { program, provider }: SolanaProgram = await initProfileProgram(wallet);
    let [profileMappingPDA, profileMappingBump] = await getProfileMappingPDA(program.programId, provider.wallet.publicKey);
    let [daoAccountPDA, daoAccountBump] = await getDaoAccountPDA(program.programId);

    try {
        let resp = await program.rpc.createProfileMapping(
            profileMappingBump, new BN(0), 0, {
            accounts: {
                daoAccount: daoAccountPDA,
                profileMapping: profileMappingPDA,
                user: provider.wallet.publicKey,
                systemProgram: web3.SystemProgram.programId
            },
            signers: [],
        });
        return resp;
    } catch (err) {
        throw(err)
    }
    
}

export async function createOrUpdateProfileSolana(
    wallet: WalletContextState,
    profileId: SolanaProfileID, 
    contentId: SolanaContentID
) {
    let { program, provider }: SolanaProgram = await initProfileProgram(wallet);
    let hasCurrentProfile : boolean = false;
    // check if user has existing profile
    try {
        let _currentProfile = await getProfileSolana(wallet);
        if (_currentProfile) hasCurrentProfile = true;
    } catch(err: any) {
        if (err.code == 4200) hasCurrentProfile = false;
    }

    try {
        if (hasCurrentProfile) {
            let resp = await updateProfileSolana(profileId, contentId, program, provider);
            return resp;
        } else {
            let resp = await createProfileSolana(profileId, contentId, program, provider);
            return resp;
        }
    } catch (err) {
        throw(err)
    }
}

async function updateProfileSolana(
    profileId: SolanaProfileID, 
    contentId: SolanaContentID,
    program?: Program,
    provider?: Provider,
) {

    let [profile, profileMapping]: any = await Promise.all([
        await getProfilePDA(program.programId, profileId),
        await getProfileMappingPDA(program.programId, provider.wallet.publicKey)
    ])
        .then(resp => resp)
        .catch(err => console.log('Error in creating solana profile', err));

    let [profilePDA, profileBump] = profile;
    let [profileMappingPDA, profileMappingBump] = profileMapping;

    try {
        let resp = await program.rpc.updateProfile(
            encodeContentID(contentId),
            {
                accounts: {
                    profileMapping: profileMappingPDA,
                    profile: profilePDA,
                    address: provider.wallet.publicKey,
                    systemProgram: web3.SystemProgram.programId
                },
                signers: [],
            }
        );
        console.log('Resp:', resp);
        if (resp) {
            return resp;
        }
    } catch (err) {
        console.log('Error in creating profile', err);
    }
}

/**
 * @todo src.reduce is not a function. probably wrong abi
 * @param {*} program 
 * @param {*} provider 
 * @param {*} profileId 
 * @param {*} contentId 
 * @returns 
 */
async function createProfileSolana(
    profileId: SolanaProfileID, 
    contentId: SolanaContentID,
    program?: Program,
    provider?: Provider,
    ): Promise<FixLater> {
    
    let [profile, search, profileMapping]: any = await Promise.all([
        await getProfilePDA(program.programId, profileId),
        await getSearchAccountPDA(program.programId, profileId),
        await getProfileMappingPDA(program.programId, provider.wallet.publicKey)
    ])
        .then(resp => resp)
        .catch(err => console.log('Error in creating solana profile', err));

    let [profilePDA, profileBump] = profile;
    let [searchAccountPDA, searchAccountBump] = search;
    let [profileMappingPDA, profileMappingBump] = profileMapping;


    try {
        let resp = await program.rpc.createProfile(
            profileBump,
            searchAccountBump,
            encodeContentID(contentId),
            {
                accounts: {
                    profileMapping: profileMappingPDA,
                    profile: profilePDA,
                    searchMapping: searchAccountPDA,
                    address: provider.wallet.publicKey,
                    systemProgram: web3.SystemProgram.programId
                },
                signers: [],
            }
        );
        return resp;
    } catch (err) {
        console.log('Error in creating profile', err);
    }

}

export async function getProfileMappingSolana(wallet: FixLater) {
    const solanaProgram : SolanaProgram = await initProfileProgram(wallet);
    const { program, provider } = solanaProgram;
    if (!program) return false;

    try {
        let profileMapping = await fetchProfileMappingSolana(program, provider);
        return profileMapping
    } catch(err) {
        console.log(err);
        throw(err);
    }
    

}

function toHexString(byteArray: FixLater) {
    return Array.from(byteArray, function (byte: FixLater) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
}


export async function getProfileSolana(wallet: FixLater) {
    let { program, provider }: SolanaProgram = await initProfileProgram(wallet);
    if (!program) return false;
    try {
        const profile = await fetchProfileSolana(program, provider);
        if (profile.length > 0) {
            if (profile[1] == null) return undefined;
            let contentIdArray = profile[1].identityId
            let contentId = decodeContentID(contentIdArray);
            return contentId;
        }
    } catch(err) {
        console.log(err);
        throw(err);
    }
    
};


async function getNetworkPDAFromDao(
    program: Program, 
): Promise<number> {
    const [daoAccountPDA, daoAccountBump] = await getDaoAccountPDA(program.programId);
    const daoAccount = await program.account.daoAccount.fetch(daoAccountPDA);
    return daoAccount.networkCount;
}

async function addExternalAddress(
    wallet: WalletContextState,
    networkId: number = 1,
    program: Program,
    provider: Provider,
) {

    // get profile mapping account
    const [profileMappingPDA, profileMappingBump] = await getProfileMappingPDA(program.programId, provider.wallet);
    const profileMappingAccount = await program.account.profileMapping.fetch(profileMappingPDA);
    const profileMappingId = profileMappingAccount.profileID.toNumber();
    console.log(profileMappingId);

    // profile account
    const [profilePDA, profileBump] = await getProfilePDA(program.programId, profileMappingId);
    const profileAccount = await program.account.profile.fetch(profilePDA);
    const addressNumber = profileAccount.addressNumber.toNumber();
    console.log(addressNumber)
    // search account
    const [searchPDA, searchBump] = await getSearchAccountPDA(program.programId, profileMappingId);

}

/**
 * for wallet binding
 */
export async function getNetworkCount(
    wallet: FixLater
): Promise<number> {
    let { program, provider }: SolanaProgram = await initProfileProgram(wallet);
    const networkCount = await getNetworkPDAFromDao(program);
    return networkCount
}

export async function createProfileMapping(
    wallet: WalletContextState
) {
    let { program, provider }: SolanaProgram = await initProfileProgram(wallet);

    // get dao account
    const [daoAccountPDA, daoAccountBump] = await getDaoAccountPDA(program.programId);
    const [profileMappingPDA, profileMappingBump] = await getProfileMappingPDA(program.programId, provider.wallet);

    try {
        const txSig = await program.rpc.createProfileMapping(
            profileMappingBump, new BN(1), 1, {
                accounts: {
                    daoAccount: daoAccountPDA,
                    profileMapping: profileMappingPDA,
                    user: provider.wallet.publicKey,
                    systemProgram: SystemProgram.programId
                },
                signers: [],
            });
    
        return txSig;
    } catch(err) {
        console.log(err);
        throw(ErrorHandler(4300))
    }


}