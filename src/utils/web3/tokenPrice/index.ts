import { IPriceFeed } from "../../../schema/Token/priceFeed";
import { ITokenBalance } from "../../../schema/Token/tokenList";


/**
 * method to get the latest price of the token
 * @param t 
 * @param priceFeed 
 * @returns 
 */
    const getLastPriceBySymbol = (
    t: ITokenBalance, 
    priceFeed: IPriceFeed[]
    ) => {
    let b = t.tokens[0].symbol.toLowerCase();
    let p : number = priceFeed.filter((v: IPriceFeed) => {
        let a = v.symbol.toLowerCase();
        if (b === 'weth') {
            b = 'eth'
        }
        return a === b;
    })[0]?.price || 1;
    
    if (b === 'usdt' || b === 'usdc') {
        p = 1;
    };

    return p
}

/**
 * provide {TokenBalance} and {PriceFeed}
 * 
 */
const mapTokenPrice = (
    tokenList: ITokenBalance[], 
    pricefeed: IPriceFeed[]
    ): ITokenBalance[] => {
    return tokenList.map((t) => {
        let lastPrice = getLastPriceBySymbol(t, pricefeed);
        return {
            ...t,
            lastPrice: lastPrice
        }
    });
};

/**
 * handle token symbol mapping
 * @param v input token symbol
 * @returns 
 */
const parseTokenSymbol = (v: string) => {
    let l: string;

    switch(v.toUpperCase()) {
        case 'WETH':
        case 'ETH':
            l = 'ETH';
            break
        default:
            l = v.toUpperCase();
            break
    }

    return l;
}

const parseTokenName = (v: string) => {
    let l: string;

    switch(v.toUpperCase()) {
        case 'WETH':
        case 'ETH':
            l = 'Ethereum';
            break
        case 'MATIC':
            l = 'Polygon';
            break
        case 'USDT':
            l = 'Tether USD';
            break
        case 'USDC':
            l = 'USD Coin';
            break
        default:
            l = v.toUpperCase();
            break
    }

    return l;
}

export { 
    getLastPriceBySymbol,
    mapTokenPrice,
    parseTokenSymbol,
    parseTokenName
}