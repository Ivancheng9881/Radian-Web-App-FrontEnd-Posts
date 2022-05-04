

export interface IUserSession {
    address: string,
    expiredAt: Date,
    nonce: number,
}

export interface MessageSignature {
    signature: string,
    address?: string,
    nonce?: number,
}

export interface AuthHeader {
    authentication: string
}