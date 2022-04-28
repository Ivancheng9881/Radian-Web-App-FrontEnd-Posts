import { Avatar, Badge, Typography } from "antd";
import { FC } from "react";
import { useImage } from "react-image";
import { FullProfile } from "../../../schema/profile/profile.interface";
import ipfsUtils from "../../../utils/web3/ipfs/ipfs.utils";

interface FriendCardProps {
    profile: FullProfile
}

const FriendCard : FC<FriendCardProps> = (props) => {
    const { profile } = props;

    const { src, isLoading } = useImage({
        srcList: ipfsUtils.getImageFromCDNFailover(profile.profilePictureCid[0]),
        useSuspense: false,
    });

    return (
        <div className="rd-friendCard-root">
            <div className="rd-friendCard-inner">
                <div className="rd-friendCard-avatar-root">
                    <Badge>
                        <Avatar size='large' shape="circle" src={src} />
                    </Badge>
                </div>
                <div className="rd-friendCard-info-root">
                    <Typography.Title level={5} >
                        {profile.firstName} {profile.lastName}
                    </Typography.Title>
                    <Typography.Text strong className="rd-friendCard-info-meta" >
                        {profile.username}
                    </Typography.Text>
                </div>
            </div>
        </div>
    )
};

export default FriendCard