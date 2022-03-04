import { FixLater } from "../../schema/helper.interface";
import ipfsUtils from "../web3/ipfs/ipfs.utils";

const defaultType: string[] = ['image/png', 'image/jpg', 'image/jpeg'];
const defaultSize: number = 2 * 1024 * 1024;

const typeCheck = (
    file: FixLater,
    acceptedType : string[] = defaultType,
) : boolean =>  {

    return acceptedType.includes(file.type);
};

const sizeCheck = (
    file: FixLater,
    acceptedSize: number = defaultSize,
) : boolean => {
    return file.size < acceptedSize;
};

const image = async (
    file: FixLater,

    ) : Promise<string> => {
    console.log(file)
    // validate type
    if (!typeCheck(file)) throw({statusCode: 4001});
    // validate size
    if (!sizeCheck(file)) throw({statusCode: 4002});;

    const cid = await ipfsUtils.uploadContent(file);

    return cid.toString();
        
}

const UploadUtils = {
    defaultType,
    image,
};

export default UploadUtils;