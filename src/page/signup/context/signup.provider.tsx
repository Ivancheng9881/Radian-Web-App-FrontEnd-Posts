import { FC, useEffect, useState } from "react";
import { COMMON_TOKEN_LIST } from "../../../commons/web3";
import { ITokenList } from "../../../schema/Token/tokenList";
import { IPublicNftList, ISignupInfo } from "../type";
import SignupContext from "./signup.context";


const SignupProvider : FC = ({children}) => {

    const TEMP_PROFILE_KEY = 'radian:identity:temp';
    const TEMP_NFT_LIST_KEY = 'radian:nftList:temp';
    const TEMP_TOKEN_LIST_KEY = 'radian:tokenList:temp';

    const [ publicNft, setPublicNft ] = useState<IPublicNftList>({
        eth: [],
        polygon: [],
    });
    const [ info, setInfo ] = useState<ISignupInfo>({
        firstName: '',
        lastName: '',
        username: '',
        location: '',
        religions: '',
        gender: '',
        nationality: '',
        ethnicity: '',
        tags: [],
        profilePictureCid: []
    });
    const [ publicToken, setPublicToken ] = useState<string[]>([]);



    const updateInfo = (newState: ISignupInfo) => {
        setInfo(newState);
        localStorage.setItem(TEMP_PROFILE_KEY, JSON.stringify(newState))
    };

    const updatePublicNft = (newState: IPublicNftList) => {
        setPublicNft(newState);
        localStorage.setItem(TEMP_NFT_LIST_KEY, JSON.stringify(newState))
    }

    const updatePublicToken = (newState: string[]) => {
        setPublicToken(newState);
        localStorage.setItem(TEMP_TOKEN_LIST_KEY, JSON.stringify(newState))
    }

    const initInfo = () => {
        let temp = localStorage.getItem(TEMP_PROFILE_KEY);
        if (temp) setInfo({...info, ...JSON.parse(temp)});
    };

    const initPublicNft = () => {
        let temp = localStorage.getItem(TEMP_NFT_LIST_KEY);
        if (temp) setPublicNft({...publicNft, ...JSON.parse(temp)});
    }

    const initTokenList = () => {
        let temp = localStorage.getItem(TEMP_TOKEN_LIST_KEY);
        if (temp) setPublicToken([...publicToken, ...JSON.parse(temp)]);
    }

    useEffect(() => {
        initInfo();
        initPublicNft();
        initTokenList();
    }, [])

    return (
        <SignupContext.Provider 
            value={{
                publicNft,
                setPublicNft: updatePublicNft,
                info,
                setInfo: updateInfo,
                publicToken,
                setPublicToken: updatePublicToken,
            }}
        >
            {children}
        </SignupContext.Provider>
    )
};

export default SignupProvider;