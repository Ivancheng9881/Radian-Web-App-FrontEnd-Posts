import { useContext } from "react";
import ProfilePictureFrame from "../../../../../components/ProfilePictureFrame";
import ipfsUtils from "../../../../../utils/web3/ipfs/ipfs.utils";
import CreateProfileContext from "../../../context/profile.context";

const CheckoutNFTInformation = () => {

    const {
        profile,
    } = useContext(CreateProfileContext);

    return (
        <div>
            <div className="pl-6 pr-6">
                <div className="text-2xl mb-4 text-theme-white font-semibold">
                    NFT Display
                </div>
                <div className="block">
                    <div className="inline-flex">
                        {
                            profile?.nft.map((c) => {
                                return (
                                    <div className="" key={c}>
                                    <ProfilePictureFrame 
                                        src={ipfsUtils.getContentUrl(c)}
                                    />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};


export default CheckoutNFTInformation