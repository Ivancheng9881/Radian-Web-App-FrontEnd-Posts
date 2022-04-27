import { FC, useEffect, useState } from "react";
import NftPaginatedView from "../nft/table.components";
import { IDisplayNft } from "../../../schema/profile/profile.interface";
import { gql, useLazyQuery } from "@apollo/client";
import { COMMON_TOKEN_LIST } from "../../../commons/web3";
import { ITokenBalance, ITokenList } from "../../../schema/Token/tokenList";
import { mapTokenPrice } from "../../../utils/web3/tokenPrice";
import TokenBalanceScrollView from "./table.components";

interface PassportTokenAssetsProps {
    data: string[],
    address: string
}

const PassportTokenAssets : FC<PassportTokenAssetsProps> = (props) => {
    const { data, address } = props;

    const TOKEN_BALANCE_QUERY = gql`
        query getTokenList(
            $address: String!,
            $symbols: [TokenSearchQuery]!,
            $priceSymbols: [String]!
        ) {
            tokenList(
                address: $address, 
                tokens: $symbols
            ) {
                balance
                tokens {
                address
                network
                balance
                decimals
                symbol
                }
            }
            priceFeed(
                symbols: $priceSymbols
            ) {
                symbol
                price
                updatedAt
            }
        }
    `;
    const [ getTokenBalance ] = useLazyQuery(TOKEN_BALANCE_QUERY);

    const [ tokenListVariable, setTokenListVariable ] = useState<ITokenList[]>();
    const [ tokenList, setTokenList ] = useState<ITokenBalance[]>();

    const execQuery = async () => {
        const { loading, data, error } = await getTokenBalance({
            variables: {
                address: address,
                symbols: tokenListVariable,
                priceSymbols: ['eth', 'matic']
            }
        });
        if (!loading) {
            setTokenList(mapTokenPrice(data.tokenList, data.priceFeed));
        }
    };

    useEffect(() => {
        if (data) {
            // filter the common token list 
            // so that only those selected by the user will show up here
            let _tokenList = COMMON_TOKEN_LIST.filter((t) => {
                if (data.includes(t.symbol.toUpperCase())) {
                    return true
                }
            });
            setTokenListVariable(_tokenList)
        }
    }, [data])

    useEffect(() => {
        if (tokenListVariable) {
            execQuery();
        }
    }, [tokenListVariable]);

    return (
        <div className="rd-passport-asset-root rd-passport-nft" >
            <div className="rd-assets-root rd-assets-token-root">
                <TokenBalanceScrollView data={tokenList} />
            </div>
        </div>
    )
};

export default PassportTokenAssets;