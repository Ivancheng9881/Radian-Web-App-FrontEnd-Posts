import { FixLater } from "../../../schema/helper.interface";

export interface WalletProvider {
    selected: string
    [key: string]: string,
}

export interface Web3ProviderType {
    connect: (arg0: string) => {},
    switchProvider: (arg0: string) => {},
    providers: WalletProvider,
    network?: string
}