import { useContext } from "react";
import CreateProfileContext from "../../../context/profile.context";
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
import DatingLookingFor from "../LookingFor";
import DatingInterest from "../Interest";
import DatingAgeRange from "../AgeRange";
import DatingDistance from "../Distance";
import DatingEthnicity from "../Ethnicity";
import DatingReligion from "../Religion";
// import ProfilePassport from "../Passport";
import ProfilePicture from "../ProfilePicture";

const CreateProfileController = () => {

    const { step, stepList, scrollDirection } = useContext(CreateProfileContext);

    return (
        <ProfileWrapper>
            <FadeInOut visible={stepList[step].id==='name'} scrollUp={scrollDirection}>
                <ProfileName />
            </FadeInOut>
            <FadeInOut visible={stepList[step].id==='phone'} scrollUp={scrollDirection}>
                <ProfilePhone />
            </FadeInOut>
            <FadeInOut visible={stepList[step].id==='dob'} scrollUp={scrollDirection}>
                <ProfileBirth />
            </FadeInOut>
            <FadeInOut visible={stepList[step].id==='weight'} scrollUp={scrollDirection}>
                <ProfileWeight />
            </FadeInOut>
            <FadeInOut visible={stepList[step].id==='height'} scrollUp={scrollDirection}>
                <ProfileHeight />
            </FadeInOut>
            <FadeInOut visible={stepList[step].id==='nationality'} scrollUp={scrollDirection}>
                <ProfileNationality />
            </FadeInOut>
            <FadeInOut visible={stepList[step].id==='location'} scrollUp={scrollDirection}>
                <ProfileLocation />
            </FadeInOut>
            <FadeInOut visible={stepList[step].id==='profilePicture'} scrollUp={scrollDirection}>
                <ProfilePicture />
            </FadeInOut>           
            <FadeInOut visible={stepList[step].id==='orientation'} scrollUp={scrollDirection}>
                <DatingSexualOrientation />
            </FadeInOut>
            <FadeInOut visible={stepList[step].id==='lookingFor'} scrollUp={scrollDirection}>
                <DatingLookingFor />
            </FadeInOut>
            <FadeInOut visible={stepList[step].id==='interest'} scrollUp={scrollDirection}>
                <DatingInterest />
            </FadeInOut>
            <FadeInOut visible={stepList[step].id==='ageRange'} scrollUp={scrollDirection}>
                <DatingAgeRange />
            </FadeInOut>
            <FadeInOut visible={stepList[step].id==='distanceMax'} scrollUp={scrollDirection}>
                <DatingDistance />
            </FadeInOut>
            <FadeInOut visible={stepList[step].id==='datingEthnicity'} scrollUp={scrollDirection}>
                <DatingEthnicity />
            </FadeInOut>
            <FadeInOut visible={stepList[step].id==='datingReligion'} scrollUp={scrollDirection}>
                <DatingReligion />
            </FadeInOut>
            {/* <FadeInOut visible={stepList[step].id==='overview'} scrollUp={scrollDirection}>
                <ProfilePassport />
            </FadeInOut> */}
        </ProfileWrapper>
    )
};

export default CreateProfileController;