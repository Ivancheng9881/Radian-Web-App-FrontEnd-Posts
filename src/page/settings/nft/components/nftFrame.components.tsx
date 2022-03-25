import { Card, Spin } from "antd";
import { FC } from "react";
import { StyleSheet } from "../../../../schema/helper.interface";
import { truncateAddress } from "../../../../utils/web3/general/parser.utils";
import { INFTItem, } from "../../../../utils/nft/erc/index.d";
import { useImage } from 'react-image'
import config from "../../../../commons/config";

interface PageProps {
    data: INFTItem
};

const NFTFrame: FC<PageProps> = ({data}) => {

    const { src, isLoading } = useImage({
        srcList: [
            data.metadata.image,
            data.metadata.image ? `https://ipfs.io/ipfs/${data.metadata.image.slice(7, data.metadata.image.length)}` : '',
            `${config.assets.cdn}/imageNotFound.png`,
        ],
        useSuspense: false,
    });


    const styles: StyleSheet = {
        wrapper: {
            padding: `10px`
        },
        card: {
            width: `240px`,
        },
        image: {
            height: `240px`,
            width: `240px`,
            objectFit: 'cover',
        },
        body: {
            minHeight: `60px`
        }
    };

    return (
        <div style={styles.wrapper}>
            <Card
                cover={<Spin spinning={isLoading}><img src={src} style={styles.image} /></Spin>}
                style={styles.card}
                hoverable
            >
                <Card.Meta 
                    style={styles.body}
                    title={data.metadata.name}
                    description={truncateAddress(data.token_address, 16)}
                />
            </Card>
        </div>
    )
};

export default NFTFrame;