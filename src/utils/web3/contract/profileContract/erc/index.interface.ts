import { FixLater } from "../../../../../schema/helper.interface";

interface RSV {
    data: number[],
    type: string
}


export interface ERCProfile {
    identityID: string,
    network: string,
    profileID: string,
    verifyID: string
}

export interface TagResponse {
    tag: string[],
    deadline: Date,
    v: number,
    r: number[],
    s: number[],
}