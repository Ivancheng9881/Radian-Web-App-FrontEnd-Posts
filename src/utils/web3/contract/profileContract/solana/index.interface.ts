import { Program, Provider } from "@project-serum/anchor";
import { FixLater } from "../../../../../schema/helper.interface";


export type SolanaIdentityID = string;

export type solanaIdentityId = BigUint64Array;

export type SolanaSeedBuffer = Uint8Array;

export type SolanaProfileID = number;

export type SolanaContentID = FixLater;

export type SolanaAddressNumber = number;

// export interface SolanaProgram {
//     program: Program,
//     provider: Provider
// }

export type SolanaProgram = FixLater;


export interface SolanaProfile {
    addressNumber: number,
    bump: number,
    identityID: SolanaIdentityID,
    identityId: solanaIdentityId,
    profileID: SolanaProfileID,
    addresses: string[],
    network: string,
}
