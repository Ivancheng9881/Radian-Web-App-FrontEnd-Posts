import Typography from "../../../../../components/Typography";
import { useContext } from "react";
import CreateProfileContext from "../../../context/profile.context";
import ItemOptionList from "../../../../../components/ItemOptions";

const DatingReligion = (props) => {

    const { profile, updateProfileByKey } = useContext(CreateProfileContext);

    const options = [
        { value: 'buddhist', label: 'Buddhist'},
        { value: 'christian', label: 'Christian'},
        { value: 'hindu', label: 'Hindu' },
        { value: 'catholic', label: 'Catholic' },
        { value: 'jewish', label: 'Jewish' },
        { value: 'muslim', label: 'Muslim' },
        { value: 'agnostic', label: 'Agnostic' },
        { value: 'atheist', label: 'Atheist' },
        { value: 'spiritual', label: 'Spiritual' },
        { value: 'other', label: 'Other' },
        { value: 'open-to-all', label: 'Open to All' },
    ]

    /**
     * if value not exists in the array, insert one
     * if value already exists in the array, remove
     * 
     * @param {string} val 
     */
    const handleSelect = (val) => {
        let arr = [...profile.datingReligion];
    
        if (!arr.includes(val)) {
            // perform insert
            arr = [...arr, val];
        } else {
            // perform remove
            let idx = arr.indexOf(val);
            arr.splice(idx, 1);
        };
        updateProfileByKey('datingReligion', arr)
        
    }
 
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
                            Religion
                        </Typography.H2>
                    </div>
                    <div className="mt-10 w-full">
                        <ItemOptionList 
                            value={profile.datingReligion}
                            options={options}
                            handleSelect={handleSelect}
                            arrangment="flex"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};


export default DatingReligion;