import { Typography } from "antd";
import { FC, useEffect, useState } from "react";
import HorizontalCarousel from "../../../components/HorizontalCarousel";
import TokenCarouselItem from "../../../components/TokenFrame/CarouselItem";
import TokenCarouselItemSkeleton from "../../../components/TokenFrame/CarouselItem/skeleton.components";
import { ITokenBalance } from "../../../schema/Token/tokenList";

interface SignupSummaryTokenProps {
    tokenList: ITokenBalance[]
}

const SignupSummaryToken : FC<SignupSummaryTokenProps> = (props) => {
    const { tokenList=[] } = props;

    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ noPublicTokenAlert, setNoPublicTokenAlert ] = useState<string>(`You didn't select any token`);

    useEffect(() => {
        console.log(tokenList)
        if (tokenList.length > 0) {
            setIsLoading(false);
        };
    }, [tokenList]);

    return (
        <div className="">
            {!noPublicTokenAlert && <HorizontalCarousel 
                itemWidth={200}
                itemPadding={10}
                iconSize={20}
                iconMargin={10}
                count={tokenList.length}
            >
                {tokenList.map((t) => {
                    return (<TokenCarouselItem 
                        key={`summary-token-${t.tokens[0].symbol}`} 
                        amount={t.balance}
                        fx={t.lastPrice}
                        label={t.tokens[0].symbol}
                    />)
                })}
                {/* {isLoading && [0,1,2,3,4,5,6].map((t) => {
                    return (<TokenCarouselItemSkeleton key={`token-skeleton-${t}`} />)
                })} */}
            </HorizontalCarousel>}
            {(tokenList.length === 0) && <Typography.Title className="rd-typo-reverse" level={5} >{noPublicTokenAlert}</Typography.Title>}
        </div>
    )
};

export default SignupSummaryToken;