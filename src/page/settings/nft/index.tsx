import { FC, useContext, useEffect, useState } from "react";
import { Space } from "antd";
import Web3Context from "../../../utils/web3/context/web3.context";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiGatewayRoot } from "../../../commons/web3";
import { INFTItem, INFTList, INFTMapping, INFTPagination } from "./index.interface";
import NFTCarousel from "./components/nftCarousel.components";

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

    const [ ethData, setEthData ] = useState<INFTList>({
        cursor: '',
        page: 0,
        page_size: 0,
        result: [],
        status: '',
        total: 0,
    });
    const [ ethOffset, setEthOffset ] = useState<number>(0);
    const [ polygonData, setPolygonData ] = useState<INFTList>({
        cursor: '',
        page: 0,
        page_size: 0,
        result: [],
        status: '',
        total: 0,
    });
    const [ polygonOffset, setPolygonOffset ] = useState<number>(0);
    const [ pagination, setPagination ] = useState<INFTPagination>({
        polygon: {
            offset: 0,
            limit: pageSize
        },
        eth: {
            offset: 0,
            limit: pageSize
        }
    });


    useEffect(() => {
        if (web3Context.providers[web3Context.providers.selected]) {
            console.log('getting nft')
            getNFT();
        }
    }, [web3Context.providers]);

    const getNFT = async () => {

        try {
            let evmResp : AxiosResponse = await axios.request({
                method: 'post',
                baseURL: apiGatewayRoot,
                url: '/nft',
                data: {
                    address: "0x8e79eF9e545Fa14e205D89970d50E7caA3456683",
                    networks: [
                        {network: "polygon", offset: pagination.polygon.offset, limit: pagination.polygon.limit},
                        {network: "eth", offset: pagination.eth.offset, limit: pagination.eth.limit},
                    ]
                }
            })

            let polygonData = await handleErcNFTDataMapping(evmResp.data.polygon.result);
            let ethData = await handleErcNFTDataMapping(evmResp.data.eth.result);

            evmResp.data.polygon.result = polygonData;
            evmResp.data.eth.result = ethData;

            setEthData(evmResp.data.eth);
            setPolygonData(evmResp.data.polygon);


            setPagination({
                polygon: {
                    ...pagination.polygon,
                    offset: pagination.polygon.offset + pageSize,
                },
                eth: {
                    ...pagination.eth,
                    offset: pagination.eth.offset + pageSize,
                }
            })

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
        console.log(network)
        try {
            console.log('fetching data')
            let {data} = await axios.request({
                method: 'post',
                baseURL: apiGatewayRoot,
                url: '/nft',
                data: {
                    address: "0x8e79eF9e545Fa14e205D89970d50E7caA3456683",
                    networks: [
                        {network: network, offset: pagination[network].offset, limit: pageSize},
                    ]
                }
            })
            let newData = await handleErcNFTDataMapping(data[network].result);

            if (network == 'polygon') {
                setPolygonData({
                    ...data[network],
                    result: [...polygonData.result, ...newData]
                })
            } else if (network == 'eth') {
                setEthData({
                    ...data[network],
                    result: [...ethData.result, ...newData]
                })
            }

            setPagination({
                ...pagination,
                [network]: {
                    ...pagination[network],
                    offset: pagination[network].offset + pageSize,
                }
            })

        } catch(err) {
            console.log(err);
        }
    } 

    const handleErcNFTDataMapping = async (data: INFTItem[]) => {
        let mappedData = await Promise.all(
            data.map(async (d) => {
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
                    offset={ethOffset}
                    setOffset={setEthOffset}
                />

                <NFTCarousel 
                    key='polygon-nft' 
                    data={polygonData.result}
                    count={polygonData.result.length}
                    title={`polygon (${polygonData.result.length})`} 
                    fetchDataCallback={handleFetchNextPolygon}
                    offset={polygonOffset}
                    setOffset={setPolygonOffset}
                />
            </Space>
        </div>
    )
};

export default NFTSettings;