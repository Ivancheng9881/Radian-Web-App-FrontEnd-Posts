import { getProfileErc } from "./profileContract/erc";
import { getProfileSolana } from "./profileContract/solana";

export async function getPersonalProfile(web3Context) {
    let profile;
    console.log("getting personal profile from providers", web3Context);
    if (web3Context.providers.selected === "metamask@erc") {
        profile = await getProfileErc(web3Context.providers["metamask@erc"]);
    } else if (web3Context.providers.selected == "phantom@solana") {
        console.log("using web3 solana")
        console.log(web3Context.providers["phantom@solana"]);
        profile = await getProfileSolana(web3Context.providers["phantom@solana"]);
    }
    return profile;
};