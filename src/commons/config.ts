

const web3 : any = {
    network : {
        polygon: {
            rpc: '',
            name: 'polygon'
        },
        solana: {
            rpc: 'https://api.devnet.solana.com',
            name: 'solana'
        }
    }
};

const assets : any = {
    cdn: 'https://d1skj8m4trskbx.cloudfront.net',
    searchEngine: {
        uri: 'https://search.radian.community',
    }
} as const;

const antd = {
    layout: {
        headerHeight: 80,
        siderWidth: 400,
    }
} as const

const theme = {
    primaryDark: '#ac0329',
    darkBlue: '#3B04DE',
    lightBlue: "#5359F6",
    white: '#fff',
    bodyText: "#B9B9B9",
    black: '#000',
    danger: '#fc6058',
    backgroundLight: '#1E1E1E',
    backgroundDark: '#000000',
    lightGray: '#ced4da',
    gray: '#939393',
    success: '#33d68a',
    purple: '#c743f5',
    lightPurple: '#8c9cf8',
    lightGreen: '#7dddbe',
    red: "#FF0000"
} as const;


const config : any = {
    web3,
    antd,
    theme,
    assets
};


export default config