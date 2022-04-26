import { NftGridItemActionProps } from "../../components/NftGrid/components/Action/GridItemAction.components";
import { FullProfile, IDisplayNft } from "../../schema/profile/profile.interface";
import { ITokenList } from "../../schema/Token/tokenList";
import { INFTItem } from "../../utils/nft/erc/index.d";

type IPublicNftList = IDisplayNft;

interface ISignupInfo extends FullProfile {
    [key: string]: any,
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

