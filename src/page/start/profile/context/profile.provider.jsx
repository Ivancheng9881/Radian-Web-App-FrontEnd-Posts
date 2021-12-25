import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CreateProfileContext from "./profile.context";
import { getQuery, setQuery } from "../../../../utils/query";

function CreateProfileProvider({children}) {

    const history = useHistory();
    const stepList = [
        'name',
        'phone',
        'dob',
        'weight',
        'height',
        'nationality',
        'location'
    ];

    const [ step, setStep ] = useState(0);
    const [ scrollDirection, setScrollDirection ] = useState(true)

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
        setStep(Number(val));

    };

    return (
        <CreateProfileContext.Provider value={{step, updateStep, stepList, scrollDirection, setScrollDirection}}>
            {children}
        </CreateProfileContext.Provider>
    )
};

export default CreateProfileProvider;