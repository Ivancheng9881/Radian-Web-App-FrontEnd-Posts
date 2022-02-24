import Typography from '../../../../../components/Typography';
import { useContext } from 'react';
import DatingContext from '../../../context/datingApp/dating.context';
import Toggler from '../../../../../components/Toggler';
import SingleSlider from '../../../../../components/SingleSlider';
import { Slider } from 'antd';

const DatingDistance = (props) => {
    const { getLatestField, updateDataByKey } = useContext(DatingContext);

    let distanceIsDealBreaker = getLatestField("distanceIsDealBreaker");
    let distanceMax = getLatestField("distanceMax");
    if ( !distanceMax ) distanceMax = 100;
    if ( ! distanceIsDealBreaker ) distanceIsDealBreaker = 0;

    const dealBreakerOpts = [ { value: 1, label: 'yes' }, { value: 0, label: 'no' } ];

    const handleToggle = (val) => updateDataByKey('distanceIsDealBreaker', val);

    const handleMaxChange = (val) => updateDataByKey('distanceMax', val)

    return (
        <div id="RD-CreateProfile-height" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Dating Preference</Typography.Featured>
            <div className="w-4/5">
                <div className="inline items-end">
                    <div className="pt-4 pb-2 pr-4">
                        <Typography.H2 alignment="left">Maximum Distance (mi)</Typography.H2>
                    </div>
                    <div className="mt-10 w-full min-w-2/3vw">
                        <Slider
                            defaultValue={distanceMax}
                            max={100}
                            min={0}
                            onAfterChange={handleMaxChange}
                            tooltipVisible
                        />
                    </div>
                    <div className="inline-flex flex-wrap items-end pt-16">
                        <div className="pt-4 pb-2 pr-4">
                            <Typography.H4 alignment="left">Is this a deal breaker?</Typography.H4>
                        </div>
                        <div className="mt-10 inline-flex items-end">
                            <div className="mr-5">
                                <Toggler
                                    value={distanceIsDealBreaker}
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
