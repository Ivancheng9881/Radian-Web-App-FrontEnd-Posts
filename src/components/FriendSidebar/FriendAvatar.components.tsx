import { Avatar } from "antd";
import { FC } from "react";
import { useImage } from "react-image";
import ipfsUtils from "../../utils/web3/ipfs/ipfs.utils";
import { IIdentity } from "./index.d";

interface PageProps {
    identity: IIdentity
}

const FriendAvatar : FC<PageProps> = ({
    identity
}) => {


    const { src, isLoading } = useImage({
        srcList: ipfsUtils.getImageFromCDNFailover(identity.content.profilePictureCid[0]),
        useSuspense: false,
    });

    return (
        <div className=" rd-fdSidebar-avatar-root ">
            <Avatar className="rd-avatar-root" src={src} size='large' />
        </div>
    )
};

export default FriendAvatar;