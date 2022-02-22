import Typography from '../../../../../components/Typography';
import { useContext } from 'react';
import DatingContext from '../../../context/datingApp/dating.context';
import Toggler from '../../../../../components/Toggler';
import DoubleSlider from '../../../../../components/DoubleSlider';

const DatingAgeRange = (props) => {
    const { getLatestField, updateDataByKey } = useContext(DatingContext);

    let ageRangeIsDealBreaker = getLatestField("ageRangeIsDealBreaker");
    let ageRangeMin = getLatestField("ageRangeMin");
    let ageRangeMax = getLatestField("ageRangeMax");
    if ( !ageRangeMin ) ageRangeMin = 18;
    if ( !ageRangeMin ) ageRangeMax = 100;
    if ( ! ageRangeIsDealBreaker ) ageRangeIsDealBreaker = 0;

    const dealBreakerOpts = [ { value: 1, label: 'yes' }, { value: 0, label: 'no' } ];

    const handleToggle = (val) => updateDataByKey('ageRangeIsDealBreaker', val);

    const handleMinChange = (val) => updateDataByKey('ageRangeMin', Math.max(val, 18));

    const handleMaxChange = (val) => updateDataByKey('ageRangeMax', val);

    return (
        <div id="RD-CreateProfile-height" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Dating Preference</Typography.Featured>
            <div className="w-4/5">
                <div className="inline items-end">
                    <div className="pt-4 pb-2 pr-4">
                        <Typography.H2 alignment="left">Age Range</Typography.H2>
                    </div>
                    <div className="mt-10 w-full min-w-2/3vw">
                        <DoubleSlider
                            upper={ageRangeMax}
                            lower={ageRangeMin}
                            max={100}
                            min={17}
                            handleMinChange={handleMinChange}
                            handleMaxChange={handleMaxChange}
                        />
                    </div>
                    <div className="inline-flex flex-wrap items-end pt-16">
                        <div className="pt-4 pb-2 pr-4">
                            <Typography.H4 alignment="left">Is this a deal breaker?</Typography.H4>
                        </div>
                        <div className="mt-10 inline-flex items-end">
                            <div className="mr-5">
                                <Toggler
                                    value={ageRangeIsDealBreaker}
                                    opts={dealBreakerOpts}
                                    handleToggle={handleToggle}
                                    size="large"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatingAgeRange;
