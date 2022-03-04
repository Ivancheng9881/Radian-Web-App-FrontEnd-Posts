import Typography from '../../../../../components/Typography';
import { useContext, useEffect } from 'react';
import ItemOptionList from '../../../../../components/ItemOptions';
import CreateProfileContext from '../../../context/profile/profile.context';
import ProfileContext from '../../../context/datingApp/dating.context';

const DatingLookingFor = () => {

    const options = [
        { value: 'serious-relationship', label: 'Serious Relationship' },
        { value: 'casual-relationship', label: 'Casual Relationship' },
        { value: 'marriage', label: 'Marriage' },
        { value: 'friends', label: 'Friends' }
    ];

    const { profile, updateDataByKey } = useContext(ProfileContext);
    const { setNextDisabled } = useContext(CreateProfileContext);

    useEffect(() => {
        console.log(profile.lookingFor)
        if (!profile.lookingFor || profile.lookingFor == '') {
            setNextDisabled(true);
        } else {
            setNextDisabled(false);
        }
    }, [profile.lookingFor])

    const handleSelect = (val) => {
        updateDataByKey('lookingFor', val);
    };

    return (
        <div id="RD-CreateProfile-height" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Dating Preference</Typography.Featured>
            <div className="w-4/5">
                <div className="inline items-end">
                    <div className="pt-4 pb-2 pr-4">
                        <Typography.H2 alignment="left">I am looking for</Typography.H2>
                    </div>
                    <div className="mt-10 inline-flex items-end">
                        <div className="mr-5">
                            <ItemOptionList
                                value={[ profile.lookingFor ]}
                                options={options}
                                handleSelect={handleSelect}
                                arrangment="inline"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatingLookingFor;
