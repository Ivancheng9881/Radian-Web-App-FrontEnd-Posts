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
    const datingContext = useContext(DatingContext);

    const datingAppObj = profileContext.profile;

    const datingInfoObj = {
        location: null,
        weight: null,
        weightUnit: null,
        height: null,
        heightUnit: null,
        orientation: null,
        lookingFor: null,
        ageRangeMin: 1,
        ageRangeMax: 100,
        ageRangeIsDealBreaker: 1,
        distanceMax: 1,
        distanceIsDealBreaker: 0,
        datingEthnicity: [],
        datingReligion: [],
    };

    const [ datingInfo, setDatingInfo ] = useState(null);
    const [ updatedDatingInfo, setUpdatedDatingInfo ] = useState(datingInfoObj);

    useEffect(()=>{
        loadUpdatingIdentity();
    })

    useEffect(() => {
        if ( profileJson ) {
            const dataJson = profileContext.dataJson;
            let datingInfo = dataJson?.application?.radianDating;
            let newProfile = Object.assign({}, profileObj);
        }
        parseDatingInfoJson()
    }, [profileContext.profile.dataJson]);

    const parseDatingInfoJson = (newProfile, profileJson) => {
        if ( profileJson.identity ) {
            newProfile.identity = matchFields(profileJson.identity, newProfile.identity);
        } else {
            newProfile.identity = matchFields(profileJson, newProfile.identity)
        }
        newProfile.dataJson = profileJson;
    }

    const matchFields = (objSource, objTarget) => {
        const overlapKeys = Object.keys(objTarget).filter(k => Object.keys(objSource).includes(k));
        for ( let k in overlapKeys ) {
            objTarget[overlapKeys[k]] = objSource[overlapKeys[k]];
        }
        return objTarget;
    }

    const updateProfile = (e, type = 'text', valid) => {
        let validatorResult = Validator.validateInput(e.target.value, type);
        switch (type) {
            case 'text':
            case 'number':
                validatorResult = validatorResult;
                break;
            case 'date':
                if (!valid) validatorResult = `invalid input`;
                break;
            default:
                validatorResult = '';
                break;
        }

        setUpdatedProfile((prevState) => {
            let newState = {...prevState};
            newState.identity[e.target.name] = e.target.value;
            storeUpdatingIdentity(newState);
            return newState;
        });
    };

    //Country Code Selection
    const updateProfileByDropdownSelect = (key, val) => {
        setUpdatedProfile((prevState => {
            let newState = {...prevState};
            newState.identity[key] = val;
            storeUpdatingIdentity(newState);
            return newState;
        }));
    };

    const updateProfileByKey = (key, val, type = '') => {
        let validatorResult = Validator.validateInput(val, type);
        setUpdatedProfile((prevState) => {
            let newState = {...prevState};
            newState.identity[key] = val;
            newState.error = validatorResult;
            storeUpdatingIdentity(newState);
            return newState;
        })
    };

    const getLatestField = (key) => {
        return updatedProfile.identity[key] != null
        ? updatedProfile.identity[key]
        : profile ? profile.identity[key] : profileObj.identity[key];
    }

    const storeUpdatingIdentity = (profileToStore) => {
        window.localStorage.setItem('tempUpdatingIdentity', JSON.stringify(profileToStore));
    };

    const loadUpdatingIdentity = ()=> {
        const temp = JSON.parse(window.localStorage.getItem('tempUpdatingIdentity'));
        console.log("loaded identity", temp);
        if (temp){
            setUpdatedProfile(temp);
        }
    }

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
