import { TagSignature } from "."
import axios, { AxiosError, AxiosResponse } from "axios";
import { tagProviderUrl } from "../../../commons/web3";
import ErrorHandler from "../Error";

class RadianTagUtils {

    public createTagWithSignature = async (
        cid: string,
        tags: string[],
    ) : Promise<TagSignature> => {

        try {
            let response: AxiosResponse = await axios.request({
                method: 'post',
                url: tagProviderUrl,
                data: {
                    cid: cid,
                    userTags: tags,
                },
            })
            let tagResponse = response.data;
            tagResponse.r = tagResponse.r.data;
            tagResponse.s = tagResponse.s.data;
            return tagResponse;
        } catch(err: any) {
            switch(err.response.status) {
                case 400:
                    throw ErrorHandler(4010);
                default:
                    console.log(err.response);
                    break
            }
        }
    }
}

export type { TagSignature }
export default RadianTagUtils