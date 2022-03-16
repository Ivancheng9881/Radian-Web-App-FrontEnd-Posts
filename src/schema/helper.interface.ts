import CSS from 'csstype';


export interface PaginationType {
    count: number,
    skip: number,
    limit: number,
}


export type FixLater = any;


export interface StyleSheet {
    [key: string] : CSS.Properties
}