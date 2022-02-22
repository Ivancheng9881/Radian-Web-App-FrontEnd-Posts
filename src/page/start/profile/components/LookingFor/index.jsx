import Typography from '../../../../../components/Typography';
import { useContext } from 'react';
import DatingContext from '../../../context/datingApp/dating.context';
import ItemOptionList from '../../../../../components/ItemOptions';

const DatingLookingFor = (props) => {

    const { getLatestField, updateData } = useContext(DatingContext);

    const lookingFor = getLatestField('lookingFor');

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
        updateData(update);
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
                                value={[ lookingFor ]}
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
