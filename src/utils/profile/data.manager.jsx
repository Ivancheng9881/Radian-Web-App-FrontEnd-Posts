import { useEffect, useState } from 'react';
import Validator from '../validation';

function DataManager({ dataContext, dataObj, data, dataStorageName, children, datachangehandler=null, extraArgs={} }) {

    const [ updatedData, setUpdatedData ] = useState(dataObj);

    useEffect(()=>{
        loadUpdatingData();
    }, []);

    useEffect(()=>{
        // propagate upwards
        if (datachangehandler){
            console.log(dataStorageName, "running");
            datachangehandler(updatedData);
        }
    },[updatedData])

    const updateData = (e, type = 'text', valid) => {
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

        setUpdatedData((prevState) => {
            let newState = {...prevState};
            newState[e.target.name] = e.target.value;
            storeUpdatingData(newState);
            return newState;
        });
    };

    const updateDataByDropdownSelect = (key, val) => {
        setUpdatedData((prevState => {
            let newState = {...prevState};
            newState[key] = val;
            storeUpdatingData(newState);
            return newState;
        }));
    };

    const updateDataByKey = (key, val, type = '') => {
        let validatorResult = Validator.validateInput(val, type);
        setUpdatedData((prevState) => {
            let newState = {...prevState};
            newState[key] = val;
            newState.error = validatorResult;
            storeUpdatingData(newState);
            return newState;
        })
    };

    const updateDataByPath = (path, val, type = '') => {
        if (! Array.isArray(path)) {
            throw 'path needs to be an array';
        }
        let validatorResult = Validator.validateInput(val, type);
        console.log("updating", dataStorageName, updatedData, val);
        setUpdatedData((prevState) => {
            let newState = {...prevState};
            let lastKey = path[-1];
            let data = newState;
            path.forEach(e => (data[e] = data[e] || {}) && (data = data[e]));
            data[lastKey] = val;
            newState.error = validatorResult;
            storeUpdatingData(newState);
            return newState;
        })
    }

    const getLatestField = (key) => {
        return updatedData[key] != null
        ? updatedData[key]
        : data ? data[key] : dataObj[key];
    }

    const storeUpdatingData = (dataToStore) => {
        console.log("DataStore", JSON.stringify(dataToStore));
        window.localStorage.setItem(dataStorageName, JSON.stringify(dataToStore));
    };

    const loadUpdatingData = ()=> {
        const temp = JSON.parse(window.localStorage.getItem(dataStorageName));
        console.log("loaded data", temp);
        if (temp){
            setUpdatedData(temp);
        }
    }

    return (
        // update should only be done via the update functions
        <dataContext.Provider 
            value={{
                ...extraArgs,
                data,
                updatedData,
                getLatestField,
                updateData,
                updateDataByKey,
                updateDataByDropdownSelect,
                updateDataByPath
            }}
        >
            {children} 
        </dataContext.Provider>
    );
}

export default DataManager;