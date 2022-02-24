import { FixLater } from '../helper.interface'

export interface ProfileContextInterface {
    profile: Profile,
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

export interface Profile {
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
}