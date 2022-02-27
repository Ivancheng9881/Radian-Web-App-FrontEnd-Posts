import { ERCProfile } from "./erc/index.interface"
import { SolanaProfile } from "./solana/index.interface"

export type Profile = ERCProfile | SolanaProfile;

export type ProfileList = Profile[] | undefined;