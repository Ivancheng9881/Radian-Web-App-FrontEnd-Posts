import { PermissionSignature } from "../general/signature";
import { abi } from "./abi.json";
import BaseRadianContract, { SignerOrProvider } from "../BaseContract";
import RadianTagUtils from "../Tag/utils";

const address = '0xdf6Ce86440BB3D0A76C22Edc25535Ea49fC2a7db';

class RadianIdentity extends BaseRadianContract {

    constructor(
        provider: SignerOrProvider
    ) {
        super(address, abi, provider);

        this.createIdentityWithPermission = this.createIdentityWithPermission.bind(this);
        this.createTag = this.createTag.bind(this);
    }

    private createTag = async (
        identityCid : string,
        tags: string[],
        )  => {
        const radianTagUtils = new RadianTagUtils();

        try {
            const response = await radianTagUtils.createTagWithSignature(identityCid, tags);
            return response
        } catch (error) {
            console.log(error)
        }
    }

    createIdentityWithPermission = async (
        identityCid: string,
        tags: string[],
        tagCid: string,
        permission: PermissionSignature
    ) => {
        try {
            const tagsWithSig = await this.createTag(identityCid, tags);
            // const tx = await this.contract.createIdentityWithPermission(
            //     identityCid,
            //     ta
            // )
        } catch (error) {
            
        }
    }
}

export default RadianIdentity;