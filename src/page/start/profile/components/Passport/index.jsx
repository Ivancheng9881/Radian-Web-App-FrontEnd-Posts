import Typography from "../../../../../components/Typography";
import { useContext } from "react";
import CreateProfileContext from "../../context/profile.context";
import ItemOptionList from "../../../../../components/ItemOptions";
import PassportItem from "./item.components";

const ProfilePassport = (props) => {

    const { profile } = useContext(CreateProfileContext);


    return (
        <div id="RD-CreateProfile-height" className="RD-CreateProfileComponents">
            <Typography.Featured
                alignment='left'
            >
                Radian Passport Summary
            </Typography.Featured>
            <div className="w-4/5">
                <div className="inline items-end">
                    <div className="mt-10 w-full">
                        <div className="block">
                            <PassportItem  
                                label='Name'
                                value={`${profile.firstName} ${profile.lastName}`}
                            />
                            <PassportItem  
                                label='Date of Birth'
                                value={`${profile.day}/${profile.month}/${profile.year}`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default ProfilePassport;