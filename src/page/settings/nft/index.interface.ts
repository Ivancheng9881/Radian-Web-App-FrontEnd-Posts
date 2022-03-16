import { FixLater } from "../../../schema/helper.interface";


export interface INFTMetadata {
    name: string,
    image: string,
    description: string
}

export interface INFTItem {
    owner_of: string,
    amount: string,
    synced_at: string,
    token_address: string,
    token_id: string,
    token_uri: string
    metadata: INFTMetadata,
}

export interface INFTList {
    cursor: string,
    page: number,
    page_size: number,
    result: INFTItem[],
    status: string,
    total: number
}

export interface INFTMapping {
    [key: string] : INFTList,
}

interface Pagination {
    offset: number,
    limit: number
}

export interface INFTPagination {
    [key: string]: Pagination
}