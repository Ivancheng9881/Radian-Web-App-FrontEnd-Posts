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

export interface FullProfile {
    [key: string]: any;
    firstName: string
    lastName: string,
    day: number,
    month: number,
    year: number,
    countryCode: string,
    number: number,
    profilePictureCid: string[],
    nationality: string,
    gender: string,
    interest: string[],
    nft: string[],
    application: FixLater,
    identityID: string,
    dataJson: FixLater,
    verificationJson: FixLater,
    temp: {
        identityID: boolean,
        verificationJson: boolean,
        visible: boolean,
        dataJson: boolean,
        error: boolean
    }
    linkedAddress: ILinkedAddress[],
    network: string,
    profileID: string,
    addresses: IAddresses[],
    externalAddresses: IExternalAddress[],
}