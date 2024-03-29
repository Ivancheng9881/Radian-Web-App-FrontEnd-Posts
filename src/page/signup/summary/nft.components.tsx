import { Typography } from "antd";
import { FC, useContext, useEffect, useState } from "react";
import NftGridView from "../../../components/NftGrid/components/Grid.components";
import { INFTItem } from "../../../utils/nft/erc/index.d";
import SignupContext from "../context/signup.context";
import { ISignupContext } from "../type";

const SignupSummaryNft : FC = () => {

    const { publicNft } : ISignupContext = useContext(SignupContext);
    const [ data, setData ] = useState<INFTItem[]>();
    const [ buffering, setBuffering ] = useState<boolean>(true)

    useEffect(() => {
        let arr : INFTItem[] = [];
        for (const [key, value] of Object.entries(publicNft)) {
            arr = [...arr, ...value];
        }

        setData(arr);
        setBuffering(false);
    }, [publicNft])
    
    return (
        <div>
            {(data?.length === 0) 
                ? <Typography.Title className="rd-typo-reverse" level={5} >You didn't select any NFT</Typography.Title>
                : <NftGridView data={data} buffering={buffering} scrollable />
            }
        </div>
    )
};

export default SignupSummaryNft