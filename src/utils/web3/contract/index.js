import { getProfileErc } from "./profileContract/erc";
import { getProfileSolana } from "./profileContract/solana";

export async function getPersonalProfile(web3Context) {
    let profile;
    if (web3Context.providers.selected === "metamask@erc") {
        profile = await getProfileErc(web3Context.providers["metamask@erc"]);
        profile.network = 'erc'
    } else if (web3Context.providers.selected == "phantom@solana") {
        let identityID = await getProfileSolana(web3Context.providers["phantom@solana"]);
        profile = {identityID: identityID};
        profile.network = 'sol'
    }
    return profile;
};