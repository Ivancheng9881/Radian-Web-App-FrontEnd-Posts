import { FC, useContext, useEffect, useState } from "react";
import { Space } from "antd";
import Web3Context from "../../../../utils/web3/context/web3.context";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiGatewayRoot, ipfsCloudFrontRoot,  } from "../../../../commons/web3";
import { INFTItem, INFTList,  INFTMetadata, } from "./../index.interface";
import NFTCarousel from "./../components/nftCarousel.components";
import Validator from "../../../../utils/validation";
import ErrorHandler from "../../../../utils/errorHandler";

const styles = {
    root: {
        padding: 5,
    },
    body: {
        width: '100%',
        maxWidth: 800,
    },
    row: {
        marginBottom: 16,
    }
} as const;



const NFTETHSettings: FC = () => {

    const web3Context = useContext(Web3Context);
    const pageSize = 20;
    const NFTListApiRoute = '/nft';
    const solNFTMetadataRoute = '/nft/solana/metadata'

    const [ ethData, setEthData ] = useState<INFTList>({
        cursor: '',
        page: 0,
        page_size: 0,
        result: [],
        status: '',
        total: 0,
        offset: 0,
        limit: pageSize,
    });
    const [ polygonData, setPolygonData ] = useState<INFTList>({
        cursor: '',
        page: 0,
        page_size: 0,
        result: [],
        status: '',
        total: 0,
        offset: 0,
        limit: pageSize,
    });
    const [ solanaData, setSolanaData ] = useState<INFTList>({
        result: [],
        total: 0,
        offset: 0,
        limit: 5,
    });
    

    useEffect(() => {
        if (web3Context.providers[web3Context.providers.selected]) {
            getNFTErc();
        }
    }, [web3Context.providers]);

    const getNFTErc = async () => {

        try {
            let evmResp : AxiosResponse = await axios.request({
                method: 'post',
                baseURL: apiGatewayRoot,
                url: NFTListApiRoute,
                data: {
                    address: "0x8e79eF9e545Fa14e205D89970d50E7caA3456683",
                    networks: [
                        {network: "eth", offset: ethData.offset, limit: ethData.limit},
                    ]
                }
            })

            let ethNftData = await handleErcNFTDataMapping(evmResp.data.eth.result);
            evmResp.data.eth.result = ethNftData;

            setEthData({
                ...ethData,
                ...evmResp.data.eth,
                offset: ethData.offset + pageSize
            });

        } catch(err) {
            console.log(err);
        }
    };

    const handleFetchNextErc = async () => {
        await handleFetchNext('eth')
    };

    const handleFetchNextPolygon = async () => {
        await handleFetchNext('polygon')
    }

    const handleFetchNext = async (network: string) => {

        try {
            let networkBody: any = {
                network: network,
                limit: pageSize,
            };
            
            if (network == 'eth') {
                networkBody.offset = ethData.offset;
            }


            let {data} = await axios.request({
                method: 'post',
                baseURL: apiGatewayRoot,
                url: NFTListApiRoute,
                data: {
                    address: "0x8e79eF9e545Fa14e205D89970d50E7caA3456683",
                    networks: [ networkBody ]
                }
            })
            let newData = await handleErcNFTDataMapping(data[network].result);
            
            if (network == 'eth') {
                setEthData({
                    ...ethData,
                    ...data[network],
                    result: [...ethData.result, ...newData],
                    offset: ethData.offset + pageSize,
                })
            }

        } catch(err) {
            console.log(err);
        }
    }

    const handleErcNFTDataMapping = async (data: INFTItem[]) => {
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
    }

    return (
        <div style={styles.root}>
            <Space direction="vertical" style={styles.body}>

                <NFTCarousel 
                    key='eth-nft' 
                    data={ethData.result}
                    count={ethData.result.length}
                    title={`ETH (${ethData.result.length})`}
                    fetchDataCallback={handleFetchNextErc}
                />

            </Space>
        </div>
    )
};

export default NFTETHSettings;