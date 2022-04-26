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

    useEffect(() => {
        if (tokenList.length > 0) {
            setIsLoading(false)
        }
    }, [tokenList]);

    return (
        <div className="">
            <HorizontalCarousel 
                itemWidth={200}
                itemPadding={10}
                iconSize={20}
                iconMargin={10}
                count={tokenList.length}
            >
                {tokenList.map((t) => {
                    return (<TokenCarouselItem  
                        amount={t.balance}
                        fx={t.lastPrice}
                        label={t.tokens[0].symbol}
                    />)
                })}
                {isLoading && [0,1,2,3,4,5,6].map((t) => {
                    return (<TokenCarouselItemSkeleton key={`token-skeleton-${t}`} />)
                })}
            </HorizontalCarousel>

        </div>
    )
};

export default SignupSummaryToken;