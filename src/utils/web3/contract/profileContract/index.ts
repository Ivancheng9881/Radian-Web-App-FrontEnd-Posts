import axios, { AxiosError, AxiosResponse } from "axios";
import { tagProviderUrl } from "../../../../commons/web3";
import ErrorHandler from "../../../errorHandler";
import { Web3ProviderType } from "../../context/web3.interface";
import { getProfileErc } from "./erc";
import { TagResponse } from "./erc/index.interface";
import { getProfileSolana } from "./solana";

export async function getPersonalProfile(web3Context: Web3ProviderType) {
    let profile: any;
    console.log(web3Context)
    try {
        if (web3Context.providers.selected === "metamask@erc") {
            profile = await getProfileErc(web3Context.providers["metamask@erc"]);
            profile.network = 'erc'
            console.log(profile)
        } else if (web3Context.providers.selected == "phantom@solana") {
            let identityID = await getProfileSolana(web3Context.providers["phantom@solana"]);
            profile = {identityID: identityID};
            profile.network = 'sol'
        }
        return profile;
    } catch(err: any) {
        console.log(err);
        throw(err);
    }
};

type Network = 'erc' | 'sol';

export async function getProfileFromAddress(address: any, network: Network) {
    let profile: any;
    try {
        if (network === "erc") {
            profile = await getProfileErc(address);
        } else if (network == "sol") {
            let identityID = await getProfileSolana(address);
            profile = {identityID: identityID};
        }
        profile.network = network
        return profile;
    } catch(err: any) {
        throw(err);
    } 
}

export async function getTagWithSignature(
    cid: string, 
    userTags: string[]
    )
    : Promise<TagResponse> {

    try {
        let response: AxiosResponse = await axios.request({
            method: 'post',
            url: tagProviderUrl,
            data: {
                cid: cid,
                userTags: ['handsome', 'smart'],
            },
        })
        let tagResponse = response.data;
        tagResponse.r = tagResponse.r.data;
        tagResponse.s = tagResponse.s.data;
        return tagResponse;
    } catch(err: any) {
        switch(err.response.status) {
            case 400:
                throw ErrorHandler(4010);
            default:
                console.log(err.response);
                break
        }
    }
}
