export const ipfsContentRoot = 'https://ipfs.gateway.radian.community/ipfs/';
export const ipfsCDNRoot = 'https://api.radian.community/ipfs/';
export const ipfsCloudFrontRoot = 'https://dpsgdb63ej10g.cloudfront.net/';

export const ipfsNodeUrl = 'https://ipfs.gateway.radian.community';
export const subgraphUrlRoot = 'https://api.thegraph.com/subgraphs/name/radian-dev';
export const gasStationNetworkUrl = 'https://relay.server.polygon.radian.community/gsn1';
export const tagProviderUrl = 'https://api.radian.community/query/tag'
export const apiGatewayRoot = 'https://api.radian.community/query';

// export const maticHttpProvider = ''

export const WALLET_DOWNLOAD_LINK = {
    metamask: {
        chrome: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
        firefox: 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/',
        unsupported: undefined,
    },
    phantom: {
        chrome: 'https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa?hl=en',
        firefox: 'https://addons.mozilla.org/en-US/firefox/addon/phantom-app/',
        unsupported: undefined,
    },
};


export const COMMON_TOKEN_LIST = [
    {
        "symbol": "matic",
        "contract": [
            {
                "network": "polygon",
                "address": "0x0000000000000000000000000000000000000000"
            }
        ]
    },
    {
        "symbol": "weth",
        "contract": [
            {
                "network": "polygon",
                "address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619"
            }
        ]
    },
    {
        "symbol": "usdt",
        "contract": [
            {
                "network": "polygon",
                "address": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
            }
        ]
    },
    {
        "symbol": "usdc",
        "contract": [
            {
                "network": "polygon",
                "address": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174"
            }
        ]
    }
]