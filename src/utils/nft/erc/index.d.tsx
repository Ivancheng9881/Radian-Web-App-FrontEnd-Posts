export interface INFTMetadata {
    name: string,
    image: string,
    description: string
};

export interface INFTItem {
    owner_of?: string,
    amount?: string,
    synced_at?: string,
    token_address: string,
    token_id?: string,
    token_uri: string
    metadata: INFTMetadata,
}


export interface INFTNetwork {
    network: string,
    offset: number,
    limit: number,
}