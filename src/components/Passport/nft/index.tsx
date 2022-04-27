import { FC } from "react";
import NftPaginatedView from "./table.components";
import { IDisplayNft } from "../../../schema/profile/profile.interface";

interface PassportNftAssetsProps {
    data: IDisplayNft
}

const PassportNftAssets : FC<PassportNftAssetsProps> = (props) => {

    return (
        <div className="rd-passport-asset-root rd-passport-nft" >
            <NftPaginatedView 
                data={props.data} 
                itemPerpage={12}
                buffering={false}
                supportedNetwork={['eth', 'polygon']}
            />
        </div>
    )
};

export default PassportNftAssets;