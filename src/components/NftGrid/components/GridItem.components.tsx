import { Col } from "antd";
import { FC } from "react";
import config from "../../../commons/config";
import { INFTItem } from "../../../utils/nft/erc/index.d";
import NftGridItemAction, { NftGridItemActionProps } from "./Action/GridItemAction.components";

interface PageProps extends NftGridItemActionProps  {
    data: INFTItem,
}

const NftGridItem : FC<PageProps> = (props) => {

    const { data, mode, visible } = props

    return (
        <Col lg={4}>
            <div className={`rd-nft-grid-item-root ${mode === 'visibility' ? 'rd-nft-grid-visibility' : ''} ${visible ? 'rd-nft-grid-visible' : ''}`}>
                <div 
                    className="rd-nft-grid-item-image"
                    style={{
                        backgroundImage: `url(${data.metadata.image}), url(${config.assets.cdn}/misc/imageNotFound.png)`,
                    }}
                >
                    <NftGridItemAction {...props} />
                </div>
                <div className="rd-nft-grid-item-meta">
                    <div className="rd-nft-grid-item-text rd-nft-grid-item-title">
                        {data.metadata.name}
                    </div>
                    <div className="rd-nft-grid-item-text rd-nft-grid-item-subtitle">
                        {data.name}
                    </div>
                </div>
            </div>
        </Col>
    )
};

export default NftGridItem;