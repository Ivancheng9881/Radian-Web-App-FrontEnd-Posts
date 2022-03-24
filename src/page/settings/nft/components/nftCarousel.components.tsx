import { Skeleton, Typography } from "antd"
import React, { FC, useEffect, useState } from "react";
import { INFTItem, } from "../../../../utils/nft/erc/index.d";
import NFTFrame from "./nftFrame.components";
import HorizontalCarousel from "../../../../components/HorizontalCarousel";
import NFTFrameCTA from "./nftFrameCTA.components";
import NFTFrameSkeleton from "./nftFrameSkeleton.components";

interface PageProps {
    data: INFTItem[],
    count: number,
    title: string,
    fetchDataCallback: () => Promise<void>,
    isBuffering?: boolean
}

const NFTCarousel: FC<PageProps> = ({
    data, 
    title, 
    count, 
    fetchDataCallback,
    isBuffering=true,
}) => {

    const handleFetchData = async () => {
        await fetchDataCallback();
    }

    return (
        <>
            <Typography.Title level={3} >{title}</Typography.Title>

            <HorizontalCarousel 
                itemWidth={240}
                count={count}
                fetchDataCallback={handleFetchData}
                fetchBuffer={10}
            >
                {data.map((nft) => {
                    return <NFTFrame 
                        data={nft} 
                        key={`${nft.token_address}-${nft.token_id}`} 
                    />
                })}
                {isBuffering && [0,1,2,3].map((i) => <NFTFrameSkeleton key={`nft-skeleton-${i}`} />)}
                <NFTFrameCTA />

            </HorizontalCarousel>
        </>
    )
};

export default NFTCarousel;