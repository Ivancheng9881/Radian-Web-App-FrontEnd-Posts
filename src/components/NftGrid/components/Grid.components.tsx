import { Col, Row } from "antd";
import { FC } from "react";
import { INFTList } from "..";
import config from "../../../commons/config";
import { INFTItem } from "../../../utils/nft/erc/index.d";
import CustomScrollbar from "../../CustomScrollBar";
import { NftGridItemActionProps } from "./Action/GridItemAction.components";
import NftGridItem from "./GridItem.components";
import NFTGridItemLoadmore from "./GridItemMore.components";

interface PageProps extends NftGridItemActionProps {
    data: INFTItem[],
    buffering: boolean,
    handleFetchNext?(): Promise<void>,
    scrollable?: boolean
}

const NftGridView : FC<PageProps> = (props) => {

    const {
        data,
        buffering,
        handleFetchNext,
        visibleKey,
        scrollable=false
    } = props;

    const onIconClick = async (id: number) => {
        await props.actionHandler(id);
    }
    
    return (
        <div className={`rd-nft-grid-root ${scrollable ? 'rd-nft-grid-scrollable' : ''}`}>
            { data?.length === 0 
                ? <div className="rd-grid-not-found rd-typo-reverse rd-typo-solid" style={{paddingTop: 100}}>
                    <img src={`${config.assets.cdn}/passport/nft_not_found_white.png`} />
                    <div className="rd-grid-not-found-content">
                        Get NFT to unlock this function! 
                    </div>
                </div>
                : <CustomScrollbar height={500}>
                    <Row gutter={[12, 12]} style={{padding: 15}}>
                        {data?.map((d, id) => {
                            return (
                                <NftGridItem 
                                    key={`${d.token_address}-${d.token_id}`}
                                    {...props}
                                    data={d}
                                    onIconClick={() => onIconClick(id)}
                                    visible={d[visibleKey]}
                                />
                            )
                        })}
                        {handleFetchNext && <NFTGridItemLoadmore isLoading={buffering} onClick={handleFetchNext} /> }
                    </Row>
            </CustomScrollbar>}
        </div>
    )
};

export default NftGridView;