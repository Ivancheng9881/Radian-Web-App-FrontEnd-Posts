import { FC } from "react";
import { FullProfile } from "../../../schema/profile/profile.interface";
import HorizontalCarousel from "../../HorizontalCarousel";
import FriendCard from "../Card";

interface FriendCardCarouselProps {
    profiles: FullProfile[]
}

const FriendCardCarousel : FC<FriendCardCarouselProps> = (props) => {
    const { profiles } = props;

    return (
        <div className="rd-friendCard-carousel-root">
            <HorizontalCarousel
                itemWidth={210}
                itemPadding={10}
                count={profiles?.length}
            >
                {profiles?.map((profile) => <FriendCard profile={profile} />)}
            </HorizontalCarousel>
        </div>
    )
};

export default FriendCardCarousel