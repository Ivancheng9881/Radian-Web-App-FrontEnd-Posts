import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { INFTItem, INFTNetwork } from "./index.d";
import nftUtilsConfig from "../config";
import Validator from "../../validation";

const mapNftMetadata = async (data: INFTItem[]) => {
    let mappedData = await Promise.all(
        data.map(async (d) => {
            if (d.token_uri == null) {
                return null;
            }

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
                    baseURL: nftUtilsConfig.apiRoot,
                    url: nftUtilsConfig.getProxy.path,
                    method: 'get',
                    params: {
                        url: d.token_uri
                    }
                }
                let res : AxiosResponse = await axios.request(axiosConfig);
                d.metadata = res.data;
                return d;
            } catch(err) {
                return null;
            }
        })
    );
    return mappedData.filter((m) => m != null);

}

const getData = async (
    address: string, 
    networks: INFTNetwork[]
) : Promise<AxiosResponse> => {
    try {
        const resp = await axios.request({
            method: 'post',
            baseURL: nftUtilsConfig.apiRoot,
            url: nftUtilsConfig.getData.path,
            data: {
                address: address,
                networks: networks,
            }
        })

        return resp;
    } catch(err) {
        console.log(err);
    }
    

}

const NFTUtilsErc = {
    getData: getData,
    mapNftMetadata: mapNftMetadata
};

export default NFTUtilsErc;