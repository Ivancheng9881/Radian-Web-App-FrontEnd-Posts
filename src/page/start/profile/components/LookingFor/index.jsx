import Typography from '../../../../../components/Typography';
import { useContext } from 'react';
import CreateProfileContext from '../../../context/profile/profile.context';
import ItemOptionList from '../../../../../components/ItemOptions';

const DatingLookingFor = (props) => {
    const { profile, updateProfile } = useContext(CreateProfileContext);

    const options = [
        { value: 'serious-relationship', label: 'Serious Relationship' },
        { value: 'casual-relationship', label: 'Casual Relationship' },
        { value: 'marriage', label: 'Marriage' },
        { value: 'friends', label: 'Friends' }
    ];

    const handleSelect = (val) => {
        let update = {
            target: {
                name: 'lookingFor',
                value: val
            }
        };
        updateProfile(update);
    };

    return (
        <div id="RD-CreateProfile-height" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Dating Preference</Typography.Featured>
            <div className="w-4/5">
                <div className="inline items-end">
                    <div className="pt-4 pb-2 pr-4 w-140">
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
