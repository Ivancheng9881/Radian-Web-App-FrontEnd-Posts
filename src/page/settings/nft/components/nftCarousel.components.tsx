import { Skeleton, Typography } from "antd"
import React, { FC, useEffect, useState } from "react";
import { INFTItem } from "../index.interface";
import NFTFrame from "./nftFrame.components";
import HorizontalCarousel from "../../../../components/HorizontalCarousel";
import NFTFrameCTA from "./nftFrameCTA.components";
import NFTFrameSkeleton from "./nftFrameSkeleton.components";

interface PageProps {
    data: INFTItem[],
    count: number,
    title: string,
    fetchDataCallback: () => Promise<void>,
}

const NFTCarousel: FC<PageProps> = ({
    data, 
    title, 
    count, 
    fetchDataCallback
}) => {

    const [ initializing, setInitializing ] = useState(true);

    useEffect(() => {
        if (count > 0) {
            setInitializing(false)
        };
    }, [count])


    const handleFetchData = async () => {
        setInitializing(true);
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
                {initializing && [0,1,2,3].map((i) => <NFTFrameSkeleton key={`nft-skeleton-${i}`} />)}
                <NFTFrameCTA />

            </HorizontalCarousel>
        </>
    )
};

export default NFTCarousel;