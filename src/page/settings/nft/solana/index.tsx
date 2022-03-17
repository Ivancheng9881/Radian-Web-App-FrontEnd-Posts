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



const NFTSolanaSettings: FC = () => {

    const web3Context = useContext(Web3Context);
    const pageSize = 20;
    const NFTListApiRoute = '/nft';
    const solNFTMetadataRoute = '/nft/solana/metadata'

    const [ solanaData, setSolanaData ] = useState<INFTList>({
        result: [],
        total: 0,
        offset: 0,
        limit: 5,
    });
    

    useEffect(() => {
        if (web3Context.providers[web3Context.providers.selected]) {
            getNFTSol();
        }
    }, [web3Context.providers]);

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

export default NFTSolanaSettings;