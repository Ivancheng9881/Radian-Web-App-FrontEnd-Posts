import { FullProfile } from "../../schema/profile/profile.interface";


export interface CardFrameProps {
    onClick: () => Promise<void>,
    profile: FullProfile,
}