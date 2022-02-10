import idl from './idl.json';
import { web3, Program } from "@project-serum/anchor";
import SolanaUtils from '../../../context/solana.utils';
// import { TextDecoder } from "web-encoding";
import { PhantomWalletAdapter, PhantomWalletName } from '@solana/wallet-adapter-wallets';


export const profileContract__sol__abi = idl;
export const profileContract__sol__address = 'BPnV7ofoFnpkaDPUX97gJw5zjQGjPRnvaviUEkjgthij';

const DAO_ACCOUNT_SEED = "dao_authority_account_2";
const PROFILE_MAPPING_ACCOUNT_SEED = "profile_mapping_account_2";
const PROFILE_ACCOUNT_SEED = "profile*";
const SEARCH_ACCOUNT_SEED = "search__";

// create a fake user for getting data using the rpc api, so that user does not need to connect to provider
// function createFakeUser() {
//     let user = web3.Keypair.generate();
//     let wallet = new anchor.Wallet(user);
//     return wallet;
// }

export async function getProfileListCountSolana(provider) {
    const program = new Program(idl, profileContract__sol__address, provider);
    const [dao_account, dao_bump] = await web3.PublicKey.findProgramAddress([
        DAO_ACCOUNT_SEED
      ], program.programId);
    
    const daoAccount = await program.account.daoAccount.fetch(dao_account);
    const profileCount = daoAccount.profileCount.toNumber();
    return profileCount;
}

// get the most recent x profiles from solana
export async function getProfileListSolana(limit, provider) {
    let profiles = [];
    const program = new Program(idl, profileContract__sol__address, provider);
    for ( let i = limit ; i > 3 ; i-- ) {
        let [profilePDA, profileBump] = await getProfilePDA(program.programId, i);
        try {
            let profile = await program.account.profile.fetch(profilePDA);
            profiles.push(decodeProfileData(profile));
        } catch {
            profiles.push(undefined);
        }
    }
    return profiles;
}

function encodeProfileID(profileID) {
    const input = new Uint8Array(8);
    const array = SolanaUtils.numberToBytes(profileID);
    const array_length = array.length;
    input.set(array, 8 - array_length);
    return input;
};

function encodeContentID(cid) {
    const input = new Uint8Array(64);
    const encoder = new TextEncoder();
    const encoded_string = encoder.encode(cid);
    const array_length = encoded_string.length;
    input.set(encoded_string, 64 - array_length);
    return input;
}

function decodeContentID(cidArray) {
    let end = 0;
    cidArray.forEach((c, idx) => {
        if (c == 0) {
            end = idx
        }
    });
    const slicedArray = cidArray.slice(end + 1, cidArray.length);
    let cid = String.fromCharCode.apply(null, slicedArray);
    return cid
}

function decodeProfileData(profileData) {
    profileData.addressNumber = profileData.addressNumber.toNumber();
    profileData.identityId = decodeContentID(profileData.identityId);
    profileData.verifyId = decodeContentID(profileData.verifyId);
    return profileData;
}

async function initProfileProgram(wallet, bypassWallet = false) {
    if (bypassWallet){
        return await SolanaUtils.getProgram(
            profileContract__sol__abi,
            profileContract__sol__address
        );
    }
    let isConnected = await SolanaUtils.isConnected(wallet)
    if (!isConnected) {
        return { undefined, undefined }
    }
    return await SolanaUtils.getProgram(
        profileContract__sol__abi,
        profileContract__sol__address,
        wallet,
    )
};

async function getProgramAddress(programId, args) {
    return await web3.PublicKey.findProgramAddress(args, programId);
}

async function getProfileMappingPDA(programId, wallet) {
    let userPublicKey = wallet.publicKey ? wallet.publicKey.toBytes() : wallet.toBytes();
    return await web3.PublicKey.findProgramAddress([
        PROFILE_MAPPING_ACCOUNT_SEED,
        userPublicKey,
    ], programId);
}

async function getProfilePDA(programId, profileId) {
    return await web3.PublicKey.findProgramAddress([
        PROFILE_ACCOUNT_SEED,
        encodeProfileID(profileId)
    ], programId);
}

async function getDaoAccountPDA(programId) {
    return await web3.PublicKey.findProgramAddress([
        DAO_ACCOUNT_SEED
    ], programId);
}

async function getSearchAccountPDA(programId, profileId) {

    return await getProgramAddress(programId, [
        SEARCH_ACCOUNT_SEED,
        encodeProfileID(profileId),
        encodeProfileID(0)
    ]);
}

async function fetchProfileMappingSolana(program, provider) {
    console.log("fetch profile provider", provider);
    try {
        let [profileMappingPDA, profileMappingBump] = await getProfileMappingPDA(program.programId, provider.wallet);
        let profileMapping = await program.account.profileMapping.fetch(profileMappingPDA);
        return profileMapping;
    } catch (err) {
        console.log('Error in fetching solana profile', err);
    }
};

async function fetchProfileSolana(program, provider) {
    let profileMapping = await fetchProfileMappingSolana(program, provider);
    console.log("Profile Mapping", profileMapping);
    if (profileMapping?.profileId) {
        try {
            // only fetch profile when profileMapping exists
            let [profilePDA, profileBump] = await getProfilePDA(program.programId, profileMapping.profileId);
            let profile = await program.account.profile.fetch(profilePDA);
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


async function createProfileMappingSolana(program, provider) {
    let [profileMappingPDA, profileMappingBump] = await getProfileMappingPDA(program.programId, provider.wallet.publicKey);
    let [daoAccountPDA, daoAccountBump] = await getDaoAccountPDA(program.programId);

    try {
        let resp = await program.rpc.createProfileMapping(profileMappingBump, {
            accounts: {
                daoAccount: daoAccountPDA,
                profileMapping: profileMappingPDA,
                user: provider.wallet.publicKey,
                systemProgram: web3.SystemProgram.programId
            },
            signer: [],
        });
        return resp;
    } catch (err) {
        console.log('Error im creating profile mapping', err);
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
async function createProfileSolana(program, provider, profileId, contentId) {
    // let  = ;
    // let [ daoAccountPDA, daoAccountBump ] = await getDaoAccountPDA(program.programId);
    // let  = ;
    // let  = ;
    let [profile, search, profileMapping] = await Promise.all([
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
                signer: [],
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

export async function getProfileMappingSolana(wallet) {
    let { program, provider } = await initProfileProgram(wallet);
    if (!program) return false;

    let profileMapping = await fetchProfileMappingSolana(program, provider);

    return profileMapping;
}

function toHexString(byteArray) {
    return Array.from(byteArray, function (byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
}


export async function getProfileSolana(wallet) {
    let { program, provider } = await initProfileProgram(wallet);
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
export async function createProfilePipelineSolana(wallet, cid) {

    console.log('started pipeline')
    let { program, provider } = await initProfileProgram(wallet);
    if (!program) return false;

    // validate if the user has a profile mapping
    // let profileMapping = await fetchProfileMappingSolana(program, provider);
    let [existingProfileMapping, existingProfile] = await fetchProfileSolana(program, provider);
    console.log("Solana Profile Status: ", existingProfile, existingProfileMapping);

    if (existingProfile) {
        /**
         * @todo handle profile update?
         */
        return
    } else if (existingProfileMapping) {
        console.log("creating Profile");
        let profile = await createProfileSolana(program, provider, existingProfileMapping.profileId, cid);
        console.log('P', profile);
        return profile
    } else {
        let profileMapping = await createProfileMappingSolana(program, provider);
        console.log('profileMapping', profileMapping)
        return profileMapping
    }


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