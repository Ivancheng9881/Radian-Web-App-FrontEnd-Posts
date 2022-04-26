import { IPublicNftList } from '../../page/signup/type';
import { INFTItem } from '../../utils/nft/erc/index.d';
import { FixLater } from '../helper.interface'

interface IAddresses {
    address: string,
}

interface IExternalAddress {
    externalAddress: string,
}

export interface ProfileContextInterface {
    profile: FullProfile,
    updatedData: FixLater,
    getLatestField: () => {},
    getLatestObject: () => {},
    getUploadReadyObject: () => {},
    updateData: () => {},
    updateDataByKey: () => {},
    updateDataByDropdownSelect: () => {},
    updateDataByPath: () => {},
    deleteUpdatingData: () => {},
}

export interface ILinkedAddress {
    network: string,
    address: string,
}

export interface IDisplayNft {
    [key: string]: INFTItem[]
}

export interface FullProfile {
    [key: string]: any;
    firstName?: string
    lastName?: string,
    username?: string,
    profilePictureCid?: string[],
    nationality?: string,
    location?: string,
    religion?: string,
    ethnicity?: string,
    gender?: string,
    interest?: string[],
    nft?: IDisplayNft,
    token?: string[],
    application?: FixLater,
    identityID?: string,
    dataJson?: FixLater,
    verificationJson?: FixLater,
    linkedAddress?: ILinkedAddress[],
    network?: string,
    profileID?: string,
    addresses?: IAddresses[],
    externalAddresses?: IExternalAddress[],
}