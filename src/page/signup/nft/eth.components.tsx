import { FC, useEffect, useState } from "react";
import NFTUtils from "../../../utils/nft";
import Validator from "../../../utils/validation";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { INFTItem } from "../../../utils/nft/erc/index.d";
import { INFTList } from '../../../components/NftGrid/index.d';
import { apiGatewayRoot } from "../../../commons/web3";
import NftGridView from "../../../components/NftGrid/components/Grid.components";
import { NftGridItemActionProps } from "../../../components/NftGrid/components/Action/GridItemAction.components";

interface PageProps extends NftGridItemActionProps {
    address?: string,
}

const NftEth : FC<PageProps> = ({
    address,
    mode,
    iconClx,
}) => {

    const PAGE_SIZE = 20;
    const NETWORK = 'eth'

    const [ data, setData ] = useState<INFTList>({
        cursor: '',
        page: 0,
        page_size: 0,
        result: [],
        status: '',
        total: 0,
        offset: 0,
        limit: PAGE_SIZE,
    });

    const [ buffering, setBuffering ] = useState<boolean>(true);

    const fetchNftData = async () => {
        try {
            let networks = [
                {network: NETWORK, offset: data.offset, limit: data.limit},
            ] 
            let response = await NFTUtils.erc.getData(address, networks);
            let ethNftData = await handleDataMapping(response.data.eth.result);
            response.data.eth.result = ethNftData;
            setData({
                ...response,
                ...response.data.eth,
                offset: data.offset + PAGE_SIZE,
            });
            setBuffering(false);

        } catch(err) {
            console.log(err);
        }
    };

    const handleDataMapping = async (data: INFTItem[]) => {
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
                    return null;
                }
            })
        );
        return mappedData.filter((m) => m != null);
    };

    const handleFetchNext = async () => {
        setBuffering(true);

        try {
            let networkBody: any = {
                network: NETWORK,
                offset: data.offset,
                limit: PAGE_SIZE,
            };

            let response = await NFTUtils.erc.getData(address, [networkBody]);
            let newData = await handleDataMapping(response.data[NETWORK].result);
            
            setData({
                ...data,
                ...response.data[NETWORK],
                result: [...data.result, ...newData],
                offset: data.offset + PAGE_SIZE,
            })
            setBuffering(false);

        } catch(err) {
            console.log(err);
        }
    };

    const handleVisToggle = async (id: number) : Promise<void> => {
        console.log(id);
        let _result = data.result;
        _result[id].visible = !_result[id].visible;
        setData({
            ...data,
            result: _result
        })
    }

    useEffect(() => {
        if (address) {
            fetchNftData();
        }
    }, [address])

    return (
        <NftGridView 
            data={data.result} 
            handleFetchNext={handleFetchNext}
            buffering={buffering}
            mode={mode}
            iconClx={iconClx}
            actionHandler={handleVisToggle}
            visibleKey='visible'       
        />
    )
};

export type { INFTList };
export default NftEth;