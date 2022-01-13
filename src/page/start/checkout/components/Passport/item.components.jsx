
import { memo } from "react";
import ProfilePictureFrame from "../../../../../components/ProfilePictureFrame";
import ipfsUtils from "../../../../../utils/web3/ipfs/ipfs.utils";

const PassportItem = memo(({
    label, value, contentType='text'
}) => {
    if (contentType != 'text' ) {
        value = ipfsUtils.getContentUrl(JSON.parse(value));
        console.log(value)
    }
    return (
        <div className="text-theme-white block">
            <span>{label}: </span>
            {
                contentType === 'image' 
                ? <ProfilePictureFrame src={value} />
                : <span>{value}</span>
            }
        </div>
    )
});

export default PassportItem;