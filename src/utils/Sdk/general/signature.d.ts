
export interface BaseSignature {
    v: any,
    r: any,
    s: any
}

export interface PermissionSignature extends BaseSignature {
    permission: boolean,
    deadline: number,
}

