import { IToken } from "./token";

export interface ITokenBalance {
    balance: number,
    tokens: IToken[],
    lastPrice?: number,
}

export interface ITokenContractMeta {
    network: string,
    address: string,
}

export interface ITokenList {
    symbol: string,
    contract: ITokenContractMeta[],
}