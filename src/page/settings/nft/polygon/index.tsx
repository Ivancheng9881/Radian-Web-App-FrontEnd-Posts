import { FC, useContext, useEffect, useState } from "react";
import { Space } from "antd";
import Web3Context from "../../../../utils/web3/context/web3.context";
import { INFTList, } from "./../index.interface";
import NFTCarousel from "./../components/nftCarousel.components";
import NFTUtils from "../../../../utils/nft";
import { StyleSheet } from "../../../../schema/helper.interface";

const NFTPolygonSettings: FC = () => {

    const web3Context = useContext(Web3Context);
    const pageSize = 20;
    const network = 'polygon';

    let address = web3Context.providers?.['metamask@erc'];

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
    }

    useEffect(() => {
        if (web3Context.providers[web3Context.providers.selected]) {
            getNFTErc();
        }
    }, [web3Context.providers]);

    const getNFTErc = async () => {

        try {
            let network = [
                {network: "polygon", offset: polygonData.offset, limit: polygonData.limit},
            ];

            let resp = await NFTUtils.erc.getData(address, network)
            let polygonNftData = await NFTUtils.erc.mapNftMetadata(resp.data.polygon.result)
            
            resp.data.polygon.result = polygonNftData;

            setPolygonData({
                ...polygonData,
                ...resp.data.polygon,
                offset: polygonData.offset + pageSize
            });
            setIsBuffering(false);

        } catch(err) {
            console.log(err);
        }
    };

    const handleFetchNext = async () => {

        try {
            let networkBody: any = {
                network: network,
                limit: pageSize,
            };
            
            networkBody.offset = polygonData.offset;
            let { data } = await NFTUtils.erc.getData(address, [networkBody])
            let newData = await NFTUtils.erc.mapNftMetadata(data[network].result)

            setPolygonData({
                ...polygonData,
                ...data[network],
                result: [...polygonData.result, ...newData],
                offset: polygonData.offset + pageSize,
            })

        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div style={styles.root}>
            <Space direction="vertical" style={styles.body}>
                <NFTCarousel 
                    key='polygon-nft' 
                    data={polygonData.result}
                    count={polygonData.result.length}
                    title={`polygon (${polygonData.result.length})`} 
                    fetchDataCallback={handleFetchNext}
                    isBuffering={isBuffering}
                />
            </Space>
        </div>
    )
};

export default NFTPolygonSettings;