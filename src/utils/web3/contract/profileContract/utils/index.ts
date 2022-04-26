import { 
    getProfileFromIDSubgraph, 
    getSupportedExternalNetworkList
} from "../erc/index"; 
import { getFullProfileFromIDSolana } from "../solana/index"; 
import ipfsUtils from '../../../ipfs/ipfs.utils';
import { Connection } from '@solana/web3.js';
import { Provider } from '@project-serum/anchor';
import config from "../../../../../commons/config";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { FullProfile } from "../../../../../schema/profile/profile.interface";
import { FixLater } from "../../../../../schema/helper.interface";

interface IdentityType {
    identityID: string,
    addresses: string[],
    externalAddresses: string[],
}

/**
 * internal function to handle fetching of identityId by pid
 * @param pid 
 * @param network 
 * @param SolWallet 
 * @returns {FullProfile}
 */
const getIdentitytID = async (
    pid: number,
    network: string,
    SolWallet? : WalletContextState,
) : Promise<FullProfile> =>  {

    try {
        if (network.toUpperCase() === "ERC") {
            const supportedNetwork = await getSupportedExternalNetworkList();
            const profile: FullProfile = await getProfileFromIDSubgraph(pid);
            // const profile: FullProfile = await getProfileFromID(pid);
            let ercAddr = profile.addresses.map((a) => ({network: 'polygon', address: a.address}));
            let solAddr = profile.externalAddresses.map((a) => {
                // let n = supportedNetwork.filter((i) => i.networkID == a.)
                return {network: 'solana', address: a.externalAddress}
            })
            return profile;

        } else if (network.toUpperCase() === "SOLANA") {
            const connection = new Connection(config.web3.network.solana.rpc, "processed");
            const provider = new Provider(connection, SolWallet, {commitment: "processed"});
            const profile: FullProfile = await getFullProfileFromIDSolana(pid, provider);
            return profile;

        } else if (network === undefined && pid === undefined) {
            // setProfile(myProfile);
        }

    } catch(err) {
        console.log(err)
    
    }

    // console.log("View Profile", profile);

};

/**
 * 
 * @param pid 
 * @param network 
 * @param SolWallet 
 * @returns 
 */
const fetchProfiles = async (
    pid: number,
    network: string,
    SolWallet? : WalletContextState,
) => {
    try {
        let profile = await getIdentitytID(pid, network, SolWallet);
        let _profile = await ipfsUtils.getContentJson(profile.identityID);
        console.log('kayton@debug', profile, _profile)
        profile = {...profile, ..._profile, identityID: profile.identityID}
        return profile
    
    } catch(err) {
        console.log(err)
    }
};

const createProfileCid = async (profile: FullProfile) : Promise<FixLater> => {
    let profileJson = JSON.stringify(profile);
    const cid = await ipfsUtils.uploadContent(profileJson);
    return cid;
};

const ProfileContractUtils = {
    fetchProfiles,
    createProfileCid
};

export default ProfileContractUtils;