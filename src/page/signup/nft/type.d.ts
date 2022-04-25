import { NftGridItemActionProps } from "../../../components/NftGrid/components/Action/GridItemAction.components";
import { ITokenList } from "../../../schema/Token/tokenList";
import { INFTItem } from "../../../utils/nft/erc/index.d";

interface IPublicNftList {
    [key: string]: INFTItem[]
}

interface ISignupInfo {
    [key: string]: any,
    firstName: string,
    lastName: string,
    username: string,
    location: string,
    religion?: string,
    gender?: string,
    nationality?: string,
    ethnicity?: string,
    tags: string[],
    profilePictureCid: string[],
}

interface NftGridRootProps extends NftGridItemActionProps {
    address?: string,
    publicListUpdate(network: string, item: INFTItem, visible: boolean): void,
    publicListUpdateAll(network: string, visible: boolean, items: INFTItem[]): void,
}

interface ISignupContext {
    publicNft: IPublicNftList,
    setPublicNft(value: IPublicNftList): void,
    info: ISignupInfo,
    setInfo(value: ISignupInfo): void,
    publicToken: string[],
    setPublicToken(value: string[]): void,
}

export { 
    ISignupContext,
    ISignupInfo,
    IPublicNftList,
    NftGridRootProps,
};

