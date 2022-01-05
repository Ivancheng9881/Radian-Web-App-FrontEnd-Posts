import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CreateProfileContext from "./profile.context";
import { getQuery, setQuery } from "../../../../utils/query";

function CreateProfileProvider({children}) {

    const history = useHistory();

    let basicInfo = 'basicInfo';
    let datingPreference = 'datingPreference'
    let completeRegistration = 'completeRegistration';
    const stepList = [
        {id: 'name', stage: basicInfo},
        {id: 'phone', stage: basicInfo},
        {id: 'dob', stage: basicInfo},
        {id: 'weight', stage: basicInfo},
        {id: 'height', stage: basicInfo},
        {id: 'nationality', stage: basicInfo},
        {id: 'location', stage: basicInfo},
        {id: 'profilePicture', stage: basicInfo},
        {id: 'orientation', stage: datingPreference},
        {id: 'lookingFor', stage: datingPreference},
        {id: 'interest', stage: datingPreference},
        {id: 'ageRange', stage: datingPreference},
        {id: 'distanceMax', stage: datingPreference},
        {id: 'datingEthnicity', stage: datingPreference},
        {id: 'datingReligion', stage: datingPreference},
        {id: 'overview', stage: completeRegistration},
    ];

    const [ profile, setProfile ] = useState({
        firstName: '',
        lastName: '',
        day: '',
        month: '',
        year: '',
        countryCode: '',
        number: '',
        weight: '',
        weightUnit: 'lbs',
        height: '',
        heightUnit: 'cm',
        nationality: '',
        gender: 'male',
        orientation: 'male',
        lookingFor: '',
        interest: [],
        ageRangeMin: 20,
        ageRangeMax: 80,
        ageRangeIsDealBreaker: 0,
        distanceMax: 0,
        distanceIsDealBreaker: 0,
        datingEthnicity: [],
        datingReligion: [],
    })
    const [ step, setStep ] = useState(0);
    const [ scrollDirection, setScrollDirection ] = useState(true);

    /**
     * @initialHook
     * get the current step from query and setState
     */
    useEffect(() => {
        setInitialStep();
        return () => {}
    }, []);

    /**
     * @method
     * if step exists in the query, set the step 
     * else set the step as the initial step
     */
    const setInitialStep = () => {
        let query = getQuery(history.location.search);

        if (!query.step) {
            query = {...query, step: step}
            setQuery(history, query);
        } else {
            updateStep(query.step)
        };
    };

    /**
     * wrapped method to update step
     * query will also be updated together
     * @param {number} val 
     */
    const updateStep = (val) => {
        // invalid value for step
        if (isNaN(val)) val = 0;

        // invalid value for step
        if (val > stepList.length - 1) val = 0;

        let query = getQuery(history.location.search);
        query.step = val;
        setQuery(history, query);
        storeTempProfile()
        setStep(Number(val));
    };

    const storeTempProfile = () => {
        window.localStorage.setItem('tempProfile', JSON.stringify(profile));
    }

    const updateProfile = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        })
    };

    const updateProfileByKey = (key, val) => {
        setProfile({
            ...profile,
            [key]: val,
        })
    }

    return (
        <CreateProfileContext.Provider value={{
            profile,
            updateProfile,
            updateProfileByKey,
            step, 
            updateStep, 
            stepList, 
            scrollDirection, 
            setScrollDirection
        }}>
            {children}
        </CreateProfileContext.Provider>
    )
};

export default CreateProfileProvider;