import { Col, Row } from "antd";
import { FC } from "react";
import { INFTList } from "..";
import { INFTItem } from "../../../utils/nft/erc/index.d";
import { NftGridItemActionProps } from "./Action/GridItemAction.components";
import NftGridItem from "./GridItem.components";
import NFTGridItemLoadmore from "./GridItemMore.components";

interface PageProps extends NftGridItemActionProps {
    data: INFTItem[],
    buffering: boolean,
    handleFetchNext(): Promise<void>,
}

const NftGridView : FC<PageProps> = (props) => {

    const {
        data,
        buffering,
        handleFetchNext,
        visibleKey
    } = props;

    const onIconClick = async (id: number) => {
        await props.actionHandler(id);
    }
    
    return (
        <div className="rd-nft-grid-root">
            <Row gutter={[12, 12]}>
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
                <NFTGridItemLoadmore isLoading={buffering} onClick={handleFetchNext} /> 
            </Row>
        </div>
    )
};

export default NftGridView;