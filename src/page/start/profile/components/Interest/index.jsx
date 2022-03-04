import Typography from '../../../../../components/Typography';
import { useContext, useEffect } from 'react';
import ProfileContext from '../../../context/socialApp/profile.context';
import ItemOptionList from '../../../../../components/ItemOptions';
import CreateProfileContext from '../../../context/profile/profile.context';

const DatingInterest = (props) => {

    const { profile, updateDataByKey } = useContext(ProfileContext);
    const { setNextDisabled } = useContext(CreateProfileContext);

    const options = [
        { value: 'foodie', label: 'Foodie' },
        { value: 'walking', label: 'Walking' },
        { value: 'art', label: 'Art' },
        { value: 'language-exchage', label: 'Language Exchange' },
        { value: 'karaoke', label: 'Karaoke' },
        { value: 'tea', label: 'Tea' },
        { value: 'dog-lover', label: 'Dog lover' },
        { value: 'photography', label: 'Photography' },
        { value: 'diy', label: 'DIY' }
    ];

    useEffect(() => {
        if (!profile.interest || profile.interest == '') {
            setNextDisabled(true);
        } else {
            setNextDisabled(false);
        }
    }, [profile.interest])

    /**
     * if value not exists in the array, insert one
     * if value already exists in the array, remove
     * 
     * @param {string} val 
     */
    const handleSelect = (val) => {
        let arr = [ ...profile.interest ];

        if (!arr.includes(val)) {
            // perform insert
            arr = [ ...arr, val ];
        } else {
            // perform remove
            let idx = arr.indexOf(val);
            arr.splice(idx, 1);
        }
        updateDataByKey('interest', arr);
    };

    return (
        <div id="RD-CreateProfile-height" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Dating Preference</Typography.Featured>
            <div className="w-4/5">
                <div className="inline items-end">
                    <div className="pt-4 pb-2 pr-4">
                        <Typography.H2 alignment="left">Your Interest</Typography.H2>
                    </div>
                    <div className="mt-10 w-full">
                        <ItemOptionList
                            value={profile.interest}
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

export default DatingInterest;
