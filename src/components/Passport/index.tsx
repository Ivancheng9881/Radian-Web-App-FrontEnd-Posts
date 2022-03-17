import { FC, useEffect, useRef, useState } from "react"
import { StyleSheet } from "../../schema/helper.interface";
import { FullProfile } from "../../schema/profile/profile.interface";
import ReactCardFlip from 'react-card-flip';
import RadianPassportBack from "./back.components";
import RadianPassportFront from "./front.components";

interface PageProps {
    profile: FullProfile,
}

const RadianPassport: FC<PageProps> = ({children, profile}) => {

    const cardRef = useRef(null);

    const [ isFlipped, setIsFlipped ] = useState(false);

    const handleFlip = async () => {
        setIsFlipped((prevState) => !prevState)
    }

    const demoProfile: any = {
        "0": "QmYqa3nDfGRbAZZypT2YHRFbpQwY7KNvdtxGYagXhBXnnA",
        "firstName": "nana",
        "lastName": "ba",
        "day": "12",
        "month": "04",
        "year": "2098",
        "countryCode": "+852",
        "number": "52525252",
        "profilePictureCid": [
            "QmUZBUfnmywuX7w6tDYMuZBn4W8MJ4HfzYxCU5zgQWCNVy"
        ],
        "nationality": "venus",
        "gender": "male",
        "interest": [
            "language-exchage",
            "karaoke",
            "art"
        ],
        "nft": [],
        "application": {
            "radianDating": {
                "location": "Mars",
                "weight": "30",
                "weightUnit": "lbs",
                "height": "180",
                "heightUnit": "inch",
                "orientation": "both",
                "lookingFor": "friends",
                "ageRangeMin": 26,
                "ageRangeMax": 36,
                "ageRangeIsDealBreaker": 0,
                "distanceMax": 19,
                "distanceIsDealBreaker": 0,
                "datingEthnicity": [
                    "american-indian"
                ],
                "datingReligion": [],
                "temp": {
                    "visible": true,
                    "error": true
                }
            }
        },
        "identityID": "QmYqa3nDfGRbAZZypT2YHRFbpQwY7KNvdtxGYagXhBXnnA",
        "dataJson": {},
        "verificationJson": {},
        "temp": {
            "identityID": true,
            "verificationJson": true,
            "visible": true,
            "dataJson": true,
            "error": true
        },
        "profileID": "1",
        "network": "erc"
    }

    return (
        <div>
            <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
                <RadianPassportFront onClick={handleFlip} profile={demoProfile} />
                <RadianPassportBack onClick={handleFlip} profile={demoProfile} />
            </ReactCardFlip>
        </div>
    )
};

export default RadianPassport;