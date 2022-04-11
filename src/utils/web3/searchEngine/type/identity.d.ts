import { IGraphPagination } from "./pagination";

interface IGraphIdentityContent {
    firstName: string
    lastName: string
    day: string
    month: string
    year: string
    countryCode: string
    number: string
    profilePictureCid: string[],
    gender: string
    interest: string[]
}

export interface IGraphIdentity {
    id: string,
    profileId: string,
    identityId: string,
    content: IGraphIdentityContent
}

export interface IGraphIdentityList {
    data: IGraphIdentity[],
    meta: IGraphPagination
}