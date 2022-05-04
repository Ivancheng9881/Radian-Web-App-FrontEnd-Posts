import { Provider } from "@ethersproject/abstract-provider";
import { Signer } from "@ethersproject/abstract-signer";

export interface IContractError {
    code: number;
    message: string;
}

export type SignerOrProvider = Signer | Provider;

export interface IBaseContract {
    address: string,
    provider: SignerOrProvider,
}