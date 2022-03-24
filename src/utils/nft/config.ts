import { apiGatewayRoot } from "../../commons/web3";


const nftUtilsConfig = {
    apiRoot: apiGatewayRoot,
    getData: {
        path: '/nft',
    },
    getProxy: {
        path: "/proxy"
    }
    
};

export default nftUtilsConfig;