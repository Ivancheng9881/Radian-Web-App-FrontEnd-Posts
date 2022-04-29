import { Col, Row } from "antd";
import { FC, useEffect, useState } from "react";
import { INFTItem } from "../../../utils/nft/erc/index.d";
import { NftGridItemActionProps } from "../../NftGrid/components/Action/GridItemAction.components";
import NftGridItem from "../../NftGrid/components/GridItem.components";
import CustomScrollbar from "../../CustomScrollBar";
import NftPaginationAction from "./pagination.components";
import NftPaginationFilter, { NftPaginationFilterProps } from "./filter.components";
import { IDisplayNft } from "../../../schema/profile/profile.interface";
import config from "../../../commons/config";

interface NftPaginatedViewProps extends NftGridItemActionProps, NftPaginationFilterProps {
    data: IDisplayNft,
    buffering: boolean,
    itemPerpage: number,
    enableFilter?: boolean
    handleFetchNext?(): Promise<void>,
}

const NftPaginatedView : FC<NftPaginatedViewProps> = (props) => {

    const {
        data,
        itemPerpage=12,
        enableFilter=true,
        buffering,
        handleFetchNext,
        visibleKey,
    } = props;

    const [ totalPage, setTotalPage ] = useState(1);
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ network, setNetwork ] = useState('eth');
    const [ slices, setSlices ] = useState<number[]>([0, itemPerpage])
    const [ displayData, setDisplayData ] = useState<INFTItem[]>([]);

    useEffect(() => {
        if (network && data) {
            setDisplayData(data[network])
        }
    }, [network, data])

    useEffect(() => {
        // handle data slicing
        if (displayData?.length > 0 && currentPage > 0) {
            let start = (currentPage - 1) * itemPerpage;
            let end = start + itemPerpage;
            if (end > displayData.length) {
                end = displayData.length
            };
            setSlices([start, end])
        }
    }, [currentPage, displayData, itemPerpage, network]);

    useEffect(() => {
        // calcualte total page 
        if (displayData?.length > 0) {
            setTotalPage(Math.ceil(data[network].length / itemPerpage));
        } 
    }, [displayData])

    return (
        <div className={`rd-nft-grid-root rd-assets-root rd-nft-page-root`}>
            <div className="rd-nft-page-action-root">
                <NftPaginationFilter 
                    network={network}
                    setNetwork={setNetwork}
                    {...props} 
                />
                <NftPaginationAction  
                    totalPage={totalPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
            {
                !(displayData?.length > 0) 
                ? <div className="rd-grid-not-found">
                    <img src={`${config.assets.cdn}/passport/nft_not_found.png`} />
                    <div className="rd-grid-not-found-content">
                        Get NFT to unlock this function! 
                    </div>
                </div>
                : <CustomScrollbar height={550}>
                    <Row gutter={[12, 12]} style={{padding: 10}}>
                        {displayData?.slice(...slices).map((d, id) => {
                            return (<NftGridItem 
                                key={`${d.token_address}-${d.token_id}-${id}`}
                                {...props}
                                data={d}
                                visible={d[visibleKey]}
                            />)
                        })}

                    </Row>
                </CustomScrollbar>
            }
        </div>
    )
};

export default NftPaginatedView;