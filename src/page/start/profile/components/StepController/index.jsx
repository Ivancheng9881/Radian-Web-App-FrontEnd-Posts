import { useContext } from "react";
import CreateProfileContext from "../../context/profile.context";
import ProfileBirth from "../Birth";
import ProfileName from "../Name";
import ProfilePhone from "../Phone";
import ProfileWrapper from "../Wrapper";
import ProfileWeight from "../Weight";
import ProfileHeight from "../Height";
import ProfileNationality from "../Nationality";
import ProfileLocation from "../Location";
import FadeInOut from "../../../../../components/Transaction/FadeInout.components";
import DatingSexualOrientation from "../Orientation";

const CreateProfileController = () => {

    const { step, scrollDirection } = useContext(CreateProfileContext);

    return (
        <ProfileWrapper>
            <FadeInOut visible={step==0} scrollUp={scrollDirection}>
                <ProfileName />
            </FadeInOut>
            <FadeInOut visible={step==1} scrollUp={scrollDirection}>
                <ProfilePhone />
            </FadeInOut>
            <FadeInOut visible={step==2} scrollUp={scrollDirection}>
                <ProfileBirth />
            </FadeInOut>
            <FadeInOut visible={step==3} scrollUp={scrollDirection}>
                <ProfileWeight />
            </FadeInOut>
            <FadeInOut visible={step==4} scrollUp={scrollDirection}>
                <ProfileHeight />
            </FadeInOut>
            <FadeInOut visible={step==5} scrollUp={scrollDirection}>
                <ProfileNationality />
            </FadeInOut>
            <FadeInOut visible={step==6} scrollUp={scrollDirection}>
                <ProfileLocation />
            </FadeInOut>
            <FadeInOut visible={step==8} scrollUp={scrollDirection}>
                <DatingSexualOrientation />
            </FadeInOut>
        </ProfileWrapper>
    )
};

export default CreateProfileController;