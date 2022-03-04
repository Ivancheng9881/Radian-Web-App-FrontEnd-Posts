import Typography from '../../../../../components/Typography';
import { useContext, useEffect } from 'react';
import Toggler from '../../../../../components/Toggler';
import CreateProfileContext from '../../../context/profile/profile.context';
import ProfileContext from '../../../context/datingApp/dating.context';

const DatingSexualOrientation = () => {

    const { profile, updateDataByKey } = useContext(ProfileContext);
    const { setNextDisabled } = useContext(CreateProfileContext);

    useEffect(() => {
        if (!profile.orientation || profile.orientation == '') {
            setNextDisabled(true);
        } else {
            setNextDisabled(false);
        }
    }, [profile.orientation])


    const orientationOpts = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'both', label: 'Both' }
    ];

    const toggleOrientation = (val) => {
        updateDataByKey('orientation', val);
    };

    return (
        <div id="RD-CreateProfile-height" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Dating Preference</Typography.Featured>
            <div className="w-4/5">
                <div className="inline-flex items-end flex-wrap">
                    <div className="pt-4 pb-2 pr-4">
                        <Typography.H2 alignment="left">You are interested in</Typography.H2>
                    </div>
                    <div className="mt-10 inline-flex items-end">
                        <div className="mr-5">
                            <Toggler
                                value={profile.orientation}
                                opts={orientationOpts}
                                handleToggle={toggleOrientation}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatingSexualOrientation;
