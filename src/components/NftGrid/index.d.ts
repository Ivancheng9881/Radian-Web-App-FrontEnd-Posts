import { INFTItem, INFTMetadata } from "../../utils/nft/erc/index.d";

export interface INFTList {
    cursor?: string,
    page?: number,
    page_size?: number,
    result: INFTItem[],
    status?: string,
    total: number,
    offset: number,
    limit: number,
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