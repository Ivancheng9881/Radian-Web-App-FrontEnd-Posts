import { ethers, Contract, Event } from "ethers";
import { IBaseContract, SignerOrProvider } from "./index.d";
import { Provider } from "@ethersproject/abstract-provider";
import { Signer } from "@ethersproject/abstract-signer";

abstract class BaseRadianContract implements IBaseContract {
    provider: SignerOrProvider;
    abi: any;
    contract: Contract;
    maxBlockRange = 3500;
    address: string

    constructor(
        address: string,
        abi: any,
        provider?: Signer | Provider,

    ) {
        this.provider = provider;
        this.address = address;
        this.contract = new ethers.Contract(address, abi, provider);
    }

};

export type { IBaseContract, SignerOrProvider, }
export default BaseRadianContract;