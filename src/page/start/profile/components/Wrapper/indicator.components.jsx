import { useContext } from 'react';
import CreateProfileContext from '../../../context/profile/profile.context';

const Indicator = ({ label, value, current }) => {
    return (
        <div className={`flex item-baseline w-1/4 h-32 ${current === value && 'border-b-2 border-theme-dark-blue'}`}>
            <div className="h-fit m-auto text-theme-body-text">{label}</div>
        </div>
    );
};

const CreateProfileIndicator = (props) => {
    const { step, stepList } = useContext(CreateProfileContext);

    const indicatorOpts = [
        { value: 'basicInfo', label: 'Basic Info' },
        { value: 'datingPreference', label: 'Dating Preference' },
        { value: 'asset', label: 'Asset' },
        { value: 'completeRegistration', label: 'Complete Registration' }
    ];

    return (
        <div className="inline-flex w-full">
            {indicatorOpts.map((opts) => {
                return <Indicator key={opts.value} current={stepList[step].stage} {...opts} />;
            })}
        </div>
    );
};

export default CreateProfileIndicator;
