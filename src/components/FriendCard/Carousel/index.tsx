import { FC } from "react";
import { FullProfile } from "../../../schema/profile/profile.interface";
import HorizontalCarouselSmooth from "../../HorizontalCarousel/smooth";
import FriendCard from "../Card";

interface FriendCardCarouselProps {
    profiles: FullProfile[]
}

const FriendCardCarousel : FC<FriendCardCarouselProps> = (props) => {
    const { profiles } = props;

    return (
        <div style={{width: '100%'}} >
            <div className="rd-friendCard-carousel-root">
                <HorizontalCarouselSmooth
                    itemWidth={210}
                    itemPadding={10}
                    count={profiles?.length}
                    autoScroll
                >
                    {profiles?.map((profile) => <FriendCard key={profile.profileID} profile={profile} />)}
                </HorizontalCarouselSmooth>
            </div>
        </div>

    )
};

export default FriendCardCarousel