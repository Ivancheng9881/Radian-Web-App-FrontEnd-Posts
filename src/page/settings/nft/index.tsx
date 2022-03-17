import { FC, useContext, useEffect, useState } from "react";
import { Space } from "antd";
import Web3Context from "../../../utils/web3/context/web3.context";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiGatewayRoot, ipfsCloudFrontRoot,  } from "../../../commons/web3";
import { INFTItem, INFTList,  INFTMetadata, } from "./index.interface";
import NFTCarousel from "./components/nftCarousel.components";
import Validator from "../../../utils/validation";
import ErrorHandler from "../../../utils/errorHandler";

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



const NFTSettings: FC = () => {

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
            getNFTSol();
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
                        {network: "polygon", offset: polygonData.offset, limit: polygonData.limit},
                        {network: "eth", offset: ethData.offset, limit: ethData.limit},
                    ]
                }
            })

            let polygonNftData = await handleErcNFTDataMapping(evmResp.data.polygon.result);
            let ethNftData = await handleErcNFTDataMapping(evmResp.data.eth.result);

            evmResp.data.polygon.result = polygonNftData;
            evmResp.data.eth.result = ethNftData;

            setEthData({
                ...ethData,
                ...evmResp.data.eth,
                offset: ethData.offset + pageSize
            });
            setPolygonData({
                ...polygonData,
                ...evmResp.data.polygon,
                offset: polygonData.offset + pageSize
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
            
            if (network == 'polygon') {
                networkBody.offset = polygonData.offset;
            } else if (network == 'eth') {
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
            
            if (network == 'polygon') {
                setPolygonData({
                    ...polygonData,
                    ...data[network],
                    result: [...polygonData.result, ...newData],
                    offset: polygonData.offset + pageSize,
                })
            } else if (network == 'eth') {
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

    const getNFTSol = async () => {

        let nftListResp : AxiosResponse = await axios.request({
            method: 'post',
            baseURL: apiGatewayRoot,
            url: NFTListApiRoute,
            data: {
                address: "4wqq8gjYgVX9UytDVWjMtq9Q4dbY2fdayEdBXcbEHGMv",
                networks: [
                    {network: "solana", offset: solanaData.offset, limit: solanaData.limit},
                ]
            }
        });

        let result = nftListResp.data.solana.map((d: any) => {
            return {
                owner_of: '',
                amount: '',
                synced_at: '',
                token_address: d.mint,
                token_id: '',
                token_uri: '',
                metadata: {},
            }
        })

        let mappedData = await getSolanaMetadata(result, solanaData.offset, solanaData.limit);
        result.splice(solanaData.offset, solanaData.limit, ...mappedData);

        setSolanaData({
            ...solanaData,
            total: result.length,
            result: result,
        });
    };

    const getSolanaMetadataFromCdn = async (tokenAddress: string) => {
        try {
            let axiosConfig: AxiosRequestConfig = {
                method: 'post',
                baseURL: ipfsCloudFrontRoot,
                url: 'solanaNFT/' + tokenAddress,
            }
            const { data } = await axios.request(axiosConfig);
            return data;
        } catch(err) {
            throw(ErrorHandler(3000));
        }
    };

    const getSolanaMetadataFromApi = async (tokenAddress: string) => {

        try  {
            let axiosConfig: AxiosRequestConfig = {
                method: 'post',
                baseURL: apiGatewayRoot,
                url: solNFTMetadataRoute,
                data: {
                    address: tokenAddress
                },
            }
            const { data } = await axios.request(axiosConfig);
            return data.data;
        } catch(err) {
            console.log(err)
        }
    }

    const getSolanaMetadata = async (
        rawData: INFTItem[], 
        offset: number, 
        limit: number
        ) => {
        let batch = rawData.slice(offset, limit);

        return await Promise.all(
            batch.map(async (d) => {
                let data: any;

                try {
                    data = await getSolanaMetadataFromCdn(d.token_address);
                } catch(err: any) {
                    console.log(err)
                    if (err.code == 3000) {
                        data = await getSolanaMetadataFromApi(d.token_address);
                    } else {
                        return null
                    }
                };

                const metadata : INFTMetadata = {
                    name: data.data.name,
                    image: data.data.image,
                    description: data.data.description,
                };

                d.token_uri = data.uri;
                d.metadata = metadata;

                return d;
            })
        )
    }
    
    const handleSolanaFetchNext = async () => {}

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

                <NFTCarousel 
                    key='polygon-nft' 
                    data={polygonData.result}
                    count={polygonData.result.length}
                    title={`polygon (${polygonData.result.length})`} 
                    fetchDataCallback={handleFetchNextPolygon}
                />

                <NFTCarousel 
                    key='solana-nft' 
                    data={solanaData.result}
                    count={solanaData.result.length}
                    title={`Solana (${solanaData.result.length})`}
                    fetchDataCallback={handleSolanaFetchNext}
                />



            </Space>
        </div>
    )
};

export default NFTSettings;