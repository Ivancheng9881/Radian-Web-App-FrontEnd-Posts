import { BaseSignature } from "../general/signature";

interface TagSignature extends BaseSignature {
    tag: string[],
    deadline: Date,
}