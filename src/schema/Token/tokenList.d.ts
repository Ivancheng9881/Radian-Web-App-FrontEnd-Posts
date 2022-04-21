import { IToken } from "./token";

export interface ITokenBalance {
    balance: number,
    tokens: IToken[],
    lastPrice?: number,
}