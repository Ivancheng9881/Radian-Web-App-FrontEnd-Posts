import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ProfileContext from '../../../../utils/profile/context/profile.context';
import DatingContext from './dating.context';
import { getQuery, setQuery } from '../../../../utils/query';
import { checkoutProfileRoute, startRoute } from '../../../../commons/route';
import Validator from '../../../../utils/validation';

function DatingProvider({ children }) {
    const history = useHistory();

    const profileContext = useContext(ProfileContext);
    const dataJson = profileContext.dataJson;

    const datingContext = useContext(DatingContext);

    const datingAppObj = profileContext.profile;

    const initDatingInfor = {
        location: '',
        weight: '',
        weightUnit: '',
        height: '',
        heightUnit: '',
        orientation: '',
        lookingFor: '',
        ageRangeMin: 1,
        ageRangeMax: 100,
        ageRangeIsDealBreaker: 1,
        distanceMax: 1,
        distanceIsDealBreaker: 0,
        datingEthnicity: [],
        datingReligion: [],
    };

    const [ datingInfo, setDatingInfo ] = useState(initProfile);

    return (
        <CreateProfileContext.Provider
            value={{
                profile,
                setProfile,
                updateProfile,
                updateProfileByKey,
                updateProfileByDropdownSelect,
                step,
                updateStep,
                stepList,
                scrollDirection,
                setScrollDirection,
                checkoutStep,
                checkoutStepList,
                updateCheckoutStep
            }}
        >
            {children}
        </CreateProfileContext.Provider>
    );
}

export default CreateProfileProvider;
