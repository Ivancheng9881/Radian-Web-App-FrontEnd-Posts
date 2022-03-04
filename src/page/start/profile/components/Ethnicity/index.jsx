import Typography from '../../../../../components/Typography';
import { useContext, useEffect } from 'react';
import CreateProfileContext from '../../../context/profile/profile.context';
import ProfileContext from '../../../context/datingApp/dating.context';
import ItemOptionList from '../../../../../components/ItemOptions';

const DatingEthnicity = () => {

    const options = [
        { value: 'american-indian', label: 'American Indian' },
        { value: 'middle-eastern', label: 'Middle Eastern' },
        { value: 'white-caucasian', label: 'White/Caucasian' },
        { value: 'black-african-descent', label: 'Black/African Descent' },
        { value: 'pacific-islander', label: 'Pacific Islander' },
        { value: 'asian', label: 'Asian' },
        { value: 'hispanic-latino', label: 'Hispanic/Latino' },
        { value: 'other', label: 'Other' },
        { value: 'open', label: 'Open to All' }
    ];

    const { profile, updateDataByKey } = useContext(ProfileContext);
    const { setNextDisabled } = useContext(CreateProfileContext);

    useEffect(() => {
        if (!profile.datingEthnicity) {
            updateDataByKey('datingEthnicity', []);
        }
    }, []);

    useEffect(() => {
        if (!profile.datingEthnicity || profile.datingEthnicity.length == 0) {
            setNextDisabled(true);
        } else {
            setNextDisabled(false);
        }
    }, [profile.datingEthnicity])

    /**
     * if value not exists in the array, insert one
     * if value already exists in the array, remove
     * 
     * @param {string} val 
     */
    const handleSelect = (val) => {
        let arr = [ ...profile.datingEthnicity ];

        if (!arr.includes(val)) {
            // perform insert
            arr = [ ...arr, val ];
        } else {
            // perform remove
            let idx = arr.indexOf(val);
            arr.splice(idx, 1);
        }
        updateDataByKey('datingEthnicity', arr);
    };

    return (
        <div id="RD-CreateProfile-height" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Dating Preference</Typography.Featured>
            <div className="w-4/5">
                <div className="inline items-end">
                    <div className="pt-4 pb-2 pr-4">
                        <Typography.H2 alignment="left">Ethnicity</Typography.H2>
                    </div>
                    <div className="mt-10 w-full">
                        <ItemOptionList
                            value={profile.datingEthnicity}
                            options={options}
                            handleSelect={handleSelect}
                            arrangement="flex"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatingEthnicity;
