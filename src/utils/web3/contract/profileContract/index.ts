import { Web3ProviderType } from "../../context/web3.interface";
import { getProfileErc } from "./erc";
import { getProfileSolana } from "./solana";

export async function getPersonalProfile(web3Context: Web3ProviderType) {
    let profile: any;
    try {
        if (web3Context.providers.selected === "metamask@erc") {
            profile = await getProfileErc(web3Context.providers["metamask@erc"]);
            profile.network = 'erc'
        } else if (web3Context.providers.selected == "phantom@solana") {
            let identityID = await getProfileSolana(web3Context.providers["phantom@solana"]);
            profile = {identityID: identityID};
            profile.network = 'sol'
        }
        return profile;
    } catch(err: any) {
        throw(err);
    }
};
