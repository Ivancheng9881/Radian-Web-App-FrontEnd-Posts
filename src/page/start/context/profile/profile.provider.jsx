import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ProfileContext from '../../../../utils/profile/context/profile.context';
import CreateProfileContext from './profile.context';
import { getQuery, setQuery } from '../../../../utils/query';
import { checkoutProfileRoute, startRoute } from '../../../../commons/route';

function CreateProfileProvider({ children }) {
    const history = useHistory();

    const profileContext = useContext(ProfileContext);

    let basicInfo = 'basicInfo';
    let datingPreference = 'datingPreference';
    let asset = 'asset';

    const stepList = [
        { id: 'name', stage: basicInfo },
        { id: 'phone', stage: basicInfo },
        { id: 'dob', stage: basicInfo },
        { id: 'gender', stage: basicInfo },
        { id: 'nationality', stage: basicInfo },
        { id: 'location', stage: basicInfo },
        { id: 'profilePicture', stage: basicInfo },
        { id: 'interest', stage: basicInfo },
        { id: 'nft', stage: basicInfo },
        { id: 'weight', stage: datingPreference },
        { id: 'height', stage: datingPreference },
        { id: 'orientation', stage: datingPreference },
        { id: 'lookingFor', stage: datingPreference },
        { id: 'ageRange', stage: datingPreference },
        { id: 'distanceMax', stage: datingPreference },
        { id: 'datingEthnicity', stage: datingPreference },
        { id: 'datingReligion', stage: datingPreference },
    ];

    const checkoutStepList = [
        // { id: 'checkoutConsole', stage: 'checkoutConsole' },
        { id: 'identityInformation', stage: 'identityInformation' },
        { id: 'descriptionInformation', stage: 'descriptionInformation' },
        // { id: 'nft', stage: 'nft' },
        { id: 'profileCreated', stage: 'profileCreated' }
    ];

    const defaultProfile = {
        firstName: 'Kayton',
        lastName: 'Chiu',
        day: '01',
        month: '01',
        year: '1995',
        countryCode: '+852',
        profilePictureCid: ['QmTDg4VWmgysNRKpUp5CwESnhE9Srkgz8KWyFYr3mfcV8M'],
        number: '12345678',
        location: 'Hong Kong',
        weight: '80',
        weightUnit: 'kg',
        height: '170',
        heightUnit: 'cm',
        nationality: 'hong kong',
        gender: 'male',
        orientation: 'male',
        lookingFor: 'serious-relationship',
        interest: [ 'foodie', 'walking' ],
        ageRangeMin: 20,
        ageRangeMax: 80,
        ageRangeIsDealBreaker: 1,
        distanceMax: 70,
        distanceIsDealBreaker: 0,
        datingEthnicity: [ 'asian' ],
        datingReligion: [ 'spiritual' ],
        nft: [
            'QmdxdBrd22pJdKZesdfYFwAkh9ZcRFCQ9SVKUVatSSY3Rh',
            'Qmbdji7XbW24ZTDYyxJ1xoCZ9UB5hGiP8gqf4T2yJsNbqH',
            'QmaPjbWNWTid6Lgne7yiLCsctoYiwfjD9qKge8BmhzwDmn'
        ]
    };

    const [ step, setStep ] = useState(0);
    const [ checkoutStep, setCheckoutStep ] = useState(0);
    const [ scrollDirection, setScrollDirection ] = useState(true);

    /**
     * @initialHook
     * get the current step from query and setState
     */
    useEffect(() => {
        setInitialStep();
        return () => {};
    }, []);

    /**
     * @method
     * if step exists in the query, set the step 
     * else set the step as the initial step
     */
    const setInitialStep = () => {
        let query = getQuery(history.location.search);
        if (history.location.pathname == startRoute) {
            return;
        }
        console.log('setInitStep:', query);
        if (!query.step) {
            query = { ...query, step: step };
            setQuery(history, query);
        } else {
            updateStep(query.step);
        }
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
        if (val > stepList.length + 1) val = 0;
        if (val >= stepList.length) {
            history.push(checkoutProfileRoute);
        } else {
            let query = getQuery(history.location.search);
            query.step = val;
            setQuery(history, query);
            // storeTempProfile();
            setStep(Number(val));
        }
    };

    const updateCheckoutStep = (val) => {
        if (isNaN(val)) val = 0;

        // invalid value for step
        if (val > checkoutStepList.length - 1) val = 0;
        let query = getQuery(history.location.search);
        query.step = val;
        setQuery(history, query);
        setCheckoutStep(Number(val));
    };
    
    return (
        <CreateProfileContext.Provider
            value={{
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
