import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiGatewayRoot } from "../../../commons/web3";
import { INFTItem } from "../../../utils/nft/erc/index.d";
import Validator from "../../../utils/validation";

const findIndexFromItemList = (list: INFTItem[], item: INFTItem): number => {
    return list.findIndex((d) => d.token_address === item.token_address && d.token_id === item.token_id) 
}

const handleNftMapping = async (data: INFTItem[], existingData?: INFTItem[]) => {
    let mappedData = await Promise.all(
        data.map(async (d) => {
            if (d.token_uri == null) return null;

            if (existingData) {
                d.visible = findIndexFromItemList(existingData, d) > -1;
            };

            // handle case when the metadata is base64 encoded
            if (Validator.isBase64Encoded(d.token_uri)) {
                const json = Buffer.from(d.token_uri.substring(29), 'base64').toString();
                const metadata = JSON.parse(json);
                d.metadata = metadata;
                return d;
            }
        

            // handle case when the metadata is an url
            try {
                let axiosConfig : AxiosRequestConfig = { 
                    baseURL: apiGatewayRoot,
                    url: '/proxy',
                    method: 'get',
                    params: {
                        url: d.token_uri
                    }
                }
                let res : AxiosResponse = await axios.request(axiosConfig);
                d.metadata = res.data;
                return d;
            } catch(err) {
                console.log(err)
                return null;
            }
        })
    );
    return mappedData.filter((m) => m != null);
};

export {
    handleNftMapping,
    findIndexFromItemList,
}