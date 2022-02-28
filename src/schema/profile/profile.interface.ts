import { FixLater } from '../helper.interface'

interface addresses {
    address: string,
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

export interface FullProfile {
    firstName: string
    lastName: string,
    day: number,
    month: number,
    year: number,
    countryCode: string,
    number: number,
    profilePictureCid: string,
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
    network: string,
    profileID: string,
    addresses: addresses[],
    externalAddresses: string[],
}