import { FixLater } from "../../../../schema/helper.interface";

export interface NewWalletType {
    address: string,
    network: string,
}

export interface TargetProfileType {
    address: string,
    profileID: number,
    provider: string,
    mappedAddresses: string[],
    isFrozen: boolean,
}

export interface LinkWalletContextType {
    targetProfile: TargetProfileType,
    setTargetProfile: FixLater,
    objKey: FixLater,
    step: number,
    setStep: FixLater,
    newWallet: NewWalletType,
    setNewWallet: FixLater
}
