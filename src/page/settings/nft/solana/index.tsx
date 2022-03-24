import { FC, useContext, useEffect, useState } from "react";
import { Space } from "antd";
import Web3Context from "../../../../utils/web3/context/web3.context";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiGatewayRoot, ipfsCloudFrontRoot,  } from "../../../../commons/web3";
import { INFTList, } from "./../index.interface";
import { INFTItem, INFTMetadata } from "../../../../utils/nft/erc/index.d";
import NFTCarousel from "./../components/nftCarousel.components";
import ErrorHandler from "../../../../utils/errorHandler";
import NFTUtils from "../../../../utils/nft";
import { StyleSheet } from "../../../../schema/helper.interface";

const NFTSolanaSettings: FC = () => {

    const web3Context = useContext(Web3Context);
    const solNFTMetadataRoute = '/nft/solana/metadata'
    let address = '4wqq8gjYgVX9UytDVWjMtq9Q4dbY2fdayEdBXcbEHGMv' || web3Context.providers?.['metamask@erc'];

    const [ solanaData, setSolanaData ] = useState<INFTList>({
        result: [],
        total: 0,
        offset: 0,
        limit: 20,
    });

    const [ rawData, setRawData ] = useState([

    ])
    const [ isBuffering, setIsBuffering ] = useState<boolean>(true);

    const styles: StyleSheet = {
        root: {
            padding: `5px`,
        },
        body: {
            width: '100%',
            maxWidth: `800px`,
        },
        row: {
            marginBottom: `16px`,
        }
    };

    useEffect(() => {
        if (web3Context.providers[web3Context.providers.selected]) {
            getNFTSol();
        }
    }, [web3Context.providers]);

    const getNFTSol = async () => {

        let networks = [
            {network: "solana", offset: solanaData.offset, limit: solanaData.limit},
        ]

        try {
            let nftListResp = await NFTUtils.erc.getData(address, networks)
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
            });
            setRawData(result);
    
            let _result = await getSolanaMetadata(result, solanaData.offset, solanaData.limit);
            setSolanaData({
                ...solanaData,
                total: result.length,
                offset: solanaData.offset + solanaData.limit,
                result: _result,
            });
            setIsBuffering(false)
        } catch(err) {
            setRawData([]);
            setSolanaData({
                ...solanaData,
                total: 0,
                result: [],
            });
            setIsBuffering(false);
        }
    };

    const getSolanaMetadataFromCdn = async (tokenAddress: string) => {
        try {
            let axiosConfig: AxiosRequestConfig = {
                method: 'get',
                baseURL: ipfsCloudFrontRoot,
                url: 'solanaNFT/' + tokenAddress,
            }
            const { data } = await axios.request(axiosConfig);
            return data.data;
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
    
    const handleSolanaFetchNext = async () => {
        let _result = await getSolanaMetadata(rawData, solanaData.offset, solanaData.limit);
        setSolanaData({
            ...solanaData,
            offset: solanaData.offset + solanaData.limit,
            result: [ ...solanaData.result, ..._result ],
        });
    }

    return (
        <div style={styles.root}>
            <Space direction="vertical" style={styles.body}>

                <NFTCarousel 
                    key='solana-nft' 
                    data={solanaData.result}
                    count={solanaData.result.length}
                    title={`Solana (${solanaData.result.length})`}
                    fetchDataCallback={handleSolanaFetchNext}
                    isBuffering={isBuffering}
                />

            </Space>
        </div>
    )
};

export default NFTSolanaSettings;