import { getProfileErc } from "./profileContract/erc";
import { getProfileSolana } from "./profileContract/solana";

export async function getPersonalProfile(web3Context) {
    let profile;
    if (web3Context.selectedProvider == "metamask@erc") {
        profile = await getProfileErc(web3Context.providers["metamask@erc"]);
    } else if (web3Context.selectedProvider == "phantom@solana") {
        profile = await getProfileSolana(web3Context.providers["phantom@solana"]);
    }
    return profile;
};