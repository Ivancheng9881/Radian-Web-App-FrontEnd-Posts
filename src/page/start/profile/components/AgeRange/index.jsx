import Typography from "../../../../../components/Typography";
import { useContext } from "react";
import CreateProfileContext from "../../../context/profile.context";
import Toggler from "../../../../../components/Toggler";
import DoubleSlider from "../../../../../components/DoubleSlider";

const DatingAgeRange = (props) => {

    const { profile, updateProfile, updateProfileByKey } = useContext(CreateProfileContext);

    const dealBreakerOpts = [
        { value: 1, label: 'yes' },
        { value: 0, label: 'no' }
    ]

    const handleToggle = (val) => updateProfileByKey('ageRangeIsDealBreaker', val);
    
    const handleMinChange = (val) => updateProfileByKey('ageRangeMin', val);

    const handleMaxChange = (val) => updateProfileByKey('ageRangeMax', val);

    return (
        <div id="RD-CreateProfile-height" className="RD-CreateProfileComponents">
            <Typography.Featured
                alignment='left'
            >
                Dating Preference
            </Typography.Featured>
            <div className="w-4/5">
                <div className="inline items-end">
                    <div className="pt-4 pb-2 pr-4 w-140">
                        <Typography.H2
                            alignment="left"
                        >
                            Age Range
                        </Typography.H2>
                    </div>
                    <div className="mt-10 w-full min-w-2/3vw" >
                        <DoubleSlider 
                            upper={profile.ageRangeMax}
                            lower={profile.ageRangeMin}
                            max={100}
                            min={0}
                            handleMinChange={handleMinChange}
                            handleMaxChange={handleMaxChange}
                        />
                    </div>
                    <div className="inline-flex items-end pt-16">
                        <div className="pt-4 pb-2 pr-4 w-96">
                            <Typography.H4
                                alignment="left"
                            >
                                Is this a deal breaker?
                            </Typography.H4>
                        </div>
                        <div className="mt-10 inline-flex items-end">
                            <div className="mr-5">
                                <Toggler 
                                    value={profile.ageRangeIsDealBreaker}
                                    opts={dealBreakerOpts}
                                    handleToggle={handleToggle}
                                    size='small'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default DatingAgeRange;