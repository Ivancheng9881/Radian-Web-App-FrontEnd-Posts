import idl from './idl.json';
import { web3, Program, Provider } from "@project-serum/anchor";
import SolanaUtils from '../../../context/solana.utils';
// import { TextDecoder } from "web-encoding";
import { PhantomWalletAdapter, PhantomWalletName } from '@solana/wallet-adapter-wallets';
import { FixLater } from '../../../../../schema/helper.interface';
import { encodeUint8Array } from '../../../general/parser.utils';
import { SolanaAddressNumber, SolanaContentID, SolanaProfile, SolanaProfileID, SolanaProgram, SolanaSeedBuffer } from './index.interface';
import { resolve } from 'path/posix';
import { rejects } from 'assert';
const BN = require('bn.js');



export const profileContract__sol__abi: FixLater = idl;
export const profileContract__sol__address: string = 'DFYYCSUghKGertoyiAcpQh6LsfDT63arTFybLs4QAFLL';

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
    console.log("fetch profile provider", provider);
    try {
        let [profileMappingPDA, profileMappingBump] = await getProfileMappingPDA(program.programId, provider.wallet);
        let profileMapping = await program.account.profileMapping.fetch(profileMappingPDA);
        return profileMapping;
    } catch (err) {
        console.log('Error in fetching solana profile', err);
    }
};

async function fetchProfileSolana(
    program: Program, 
    provider: Provider
    ) {
    let profileMapping = await fetchProfileMappingSolana(program, provider);
    console.log("Profile Mapping", profileMapping);
    if (profileMapping?.profileId) {
        try {
            // only fetch profile when profileMapping exists
            console.log("pm", profileMapping);
            let [profilePDA, profileBump] = await getProfilePDA(program.programId, profileMapping.profileId.toNumber());
            let profile = await program.account.profile.fetch(profilePDA);
            console.log("p", profile);
            return [profileMapping, profile]
        } catch (err) {
            // profile does not exist
            console.log('Error in fetching profile', err)
            return [profileMapping, null];
        }
    } else {
        // no profile mapping nor profile
        return [null, null]
    }
}

async function createProfileMappingSolana(
    program: Program, 
    provider: Provider
    ) {
    let [profileMappingPDA, profileMappingBump] = await getProfileMappingPDA(program.programId, provider.wallet.publicKey);
    let [daoAccountPDA, daoAccountBump] = await getDaoAccountPDA(program.programId);

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
    program: Program, 
    provider: Provider, 
    profileId: SolanaProfileID, 
    contentId: SolanaContentID
    ): Promise<FixLater> {
    // let  = ;
    // let [ daoAccountPDA, daoAccountBump ] = await getDaoAccountPDA(program.programId);
    // let  = ;
    // let  = ;
    let [profile, search, profileMapping]: any = await Promise.all([
        await getProfilePDA(program.programId, profileId),
        await getSearchAccountPDA(program.programId, profileId),
        await getProfileMappingPDA(program.programId, provider.wallet.publicKey)
    ])
        .then(resp => resp)
        .catch(err => console.log('Error in creating solana profile', err));

    console.log('Provider:', provider);
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
        console.log('Resp:', resp);
        if (resp) {
            return resp;
        }
    } catch (err) {
        console.log('Error in creating profile', err);
    }

}

export async function getProfileMappingSolana(wallet: FixLater) {
    const solanaProgram : SolanaProgram = await initProfileProgram(wallet);
    const { program, provider } = solanaProgram;
    if (!program) return false;

    let profileMapping = await fetchProfileMappingSolana(program, provider);

    return profileMapping;
}

function toHexString(byteArray: FixLater) {
    return Array.from(byteArray, function (byte: FixLater) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
}


export async function getProfileSolana(wallet: FixLater) {
    let { program, provider }: SolanaProgram = await initProfileProgram(wallet);
    console.log(provider);
    if (!program) return false;

    let profile = await fetchProfileSolana(program, provider);
    if (profile.length > 0) {
        if (profile[1] == null) return undefined;
        let contentIdArray = profile[1].identityId
        let contentId = decodeContentID(contentIdArray);
        return contentId;
    }
}

/**
 * 1. check if the wallet is connected
 * 2. check if the user has a profile already
 * 3. check if the user has a profile mapping already
 * 
 * @param {*} wallet 
 * @returns 
 */
export async function createProfilePipelineSolana(
    wallet: FixLater, 
    cid: SolanaContentID
    ) : Promise<FixLater> {

    console.log('started pipeline')
    let { program, provider }: SolanaProgram = await initProfileProgram(wallet);
    if (!program) return false;

    // validate if the user has a profile mapping
    // let profileMapping = await fetchProfileMappingSolana(program, provider);
    let [existingProfileMapping, existingProfile]: FixLater  = await fetchProfileSolana(program, provider);
    console.log("Solana Profile Status: ", existingProfile, existingProfileMapping);

    if (! existingProfileMapping) {
        existingProfileMapping = await createProfileMappingSolana(program, provider);
        console.log('profileMapping', existingProfileMapping)
    }

    if ( ! existingProfile ) {
        console.log("creating Profile");
        existingProfile = await createProfileSolana(program, provider, existingProfileMapping.profileId, cid);
        console.log('P', existingProfile);    
    }

    return existingProfile;

    // if (profileMapping.profileId) {
    //     // validate if the user has a profile
    //     let existingProfile = await fetchProfileSolana(program, provider);
    //     console.log(existingProfile);
    // }
    // console.log(profileMapping)
    // let profile = await fetchProfileSolana(program, provider);
    // console.log(profile)


    // return await initProfileProgram();
}