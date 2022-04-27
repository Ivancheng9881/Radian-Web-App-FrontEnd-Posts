import { Typography } from "antd";
import { FC, useEffect, useState } from "react";
import { ITokenBalance } from "../../../schema/Token/tokenList";
import CustomScrollbar from "../../CustomScrollBar";
import TokenBalanceHeader from "./header.components";
import TokenBalanceRow from "./row.components";

interface TokenBalanceScrollViewProps {
    data: ITokenBalance[]
}

const TokenBalanceScrollView : FC<TokenBalanceScrollViewProps> = (props) => {
    const { data } = props;

    const [ netWorth, setNetWorth ] = useState(0);

    useEffect(() => {
        if (data?.length > 0) {
            let total = data?.reduce((prev, current) => {
                return prev + current.balance * current.lastPrice
            }, 0)
            setNetWorth(total)
        };
    }, [data])

    return (
        <>
            <Typography.Title level={5} className='rd-typo-reverse'>Assets Total ${netWorth.toPrecision(4)}</Typography.Title>
            <br />
            <TokenBalanceHeader />
            <CustomScrollbar height={250} >
                {data?.map((token) => {
                    return <TokenBalanceRow key={`token-balance-${token.tokens[0].symbol}`} data={token} />
                })}
            </CustomScrollbar>
        </>

    )
};

export default TokenBalanceScrollView;