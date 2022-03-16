import { Typography } from "antd"
import React, { FC, useEffect, useState } from "react";
import { INFTItem } from "../index.interface";
import NFTFrame from "./nftFrame.components";
import HorizontalCarousel from "../../../../components/HorizontalCarousel";
import NFTFrameCTA from "./nftFrameCTA.components";

interface PageProps {
    data: INFTItem[],
    count: number,
    title: string,
    offset: number,
    setOffset: any,
    fetchDataCallback: () => Promise<void>,
}

const NFTCarousel: FC<PageProps> = ({data, title, count, offset, setOffset, fetchDataCallback}) => {

    return (
        <>
            <Typography.Title level={3} >
                {title}
            </Typography.Title>
            <HorizontalCarousel 
                key={`horizontalCarousel-${title}`}
                itemWidth={240}
                count={count}
                fetchDataCallback={fetchDataCallback}
                fetchBuffer={10}
                offset={offset}
                setOffset={setOffset}
            >
                {data.map((nft) => {
                    return <NFTFrame 
                        data={nft} 
                        key={`${nft.token_address}-${nft.token_id}`} 
                    />
                })}
                <NFTFrameCTA />

            </HorizontalCarousel>
        </>
    )
};

export default NFTCarousel;