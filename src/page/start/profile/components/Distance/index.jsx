import Typography from '../../../../../components/Typography';
import { useContext } from 'react';
import CreateProfileContext from '../../../context/profile/profile.context';
import Toggler from '../../../../../components/Toggler';
import SingleSlider from '../../../../../components/SingleSlider';

const DatingDistance = (props) => {
    const { profile, updateDataByKey } = useContext(CreateProfileContext);

    const dealBreakerOpts = [ { value: 1, label: 'yes' }, { value: 0, label: 'no' } ];

    const handleToggle = (val) => updateDataByKey('distanceIsDealBreaker', val);

    const handleMaxChange = (val) => updateDataByKey('distanceMax', val);

    return (
        <div id="RD-CreateProfile-height" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Dating Preference</Typography.Featured>
            <div className="w-4/5">
                <div className="inline items-end">
                    <div className="pt-4 pb-2 pr-4 w-140">
                        <Typography.H2 alignment="left">Maximum Distance</Typography.H2>
                    </div>
                    <div className="mt-10 w-full min-w-2/3vw">
                        <SingleSlider
                            upper={profile.distanceMax}
                            max={100}
                            min={0}
                            handleMaxChange={handleMaxChange}
                            unit="mi"
                        />
                    </div>
                    <div className="inline-flex items-end pt-16">
                        <div className="pt-4 pb-2 pr-4 w-96">
                            <Typography.H4 alignment="left">Is this a deal breaker?</Typography.H4>
                        </div>
                        <div className="mt-10 inline-flex items-end">
                            <div className="mr-5">
                                <Toggler
                                    value={profile.distanceIsDealBreaker}
                                    opts={dealBreakerOpts}
                                    handleToggle={handleToggle}
                                    size="small"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatingDistance;
