import { useEffect, useState } from 'react';
import Validator from '../validation';

function DataManager({ dataContext, data, dataObj, dataStorageName, children, datachangehandler=null, extraArgs={} }) {

    console.log("data",data);
    const [ updatedData, setUpdatedData ] = useState({});

    useEffect(()=>{
        loadUpdatingData();
    }, []);

    // useEffect(()=>{
    //     // propagate upwards
    //     if (datachangehandler){
    //         console.log(dataStorageName, "running");
    //         datachangehandler(updatedData);
    //     }
    // },[updatedData])

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
            // newState.error = validatorResult;
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
            let lastKey = path[path.length - 1];
            let tempState = newState;
            for ( let k = 0 ; k < path.length - 1 ; k++ ) {
                if ( !tempState[path[k]] ) {
                    tempState[path[k]] = {};
                }
                tempState = tempState[path[k]];
            }
            tempState[lastKey] = val;
            // newState.error = validatorResult;
            storeUpdatingData(newState);
            return newState;
        })
    }

    const getLatestField = (key) => {
        return updatedData[key] != null ? updatedData[key] : data[key];
    }

    const getLatestObject = () => {
        let {...dataClone} = data;
        let latestObj = matchFields(updatedData, dataClone);
        latestObj.visible = updatedData.visible;
        return latestObj;
    }

    const getUploadReadyObject = () => {
        let {...dataClone} = data;
        let uploadData =  matchFields(updatedData, dataClone);
        // remove fields to hide
        let visible = updatedData.visible;
        console.log("updated data", updatedData)
        console.log("Visible", visible);
        if (visible){
            Object.entries(visible).map((k, v)=>{
                let key = k[0].split(",");
                console.log(key);
                for (let i = 0 ; i < key.length ; i++){
                    uploadData[key[i]] = k[1] ? uploadData[key[i]] : dataObj[key[i]];
                }
            })    
        }
        // remove uncessary fields
        if (dataObj.temp){
            Object.entries(dataObj.temp).map((k, v)=>{
                if (k[1]){
                    delete uploadData[k[0]];
                }
            })    
        }
        if (Object.keys(uploadData).includes('temp')) delete uploadData['temp'];
        if (Object.keys(uploadData).includes('undefined')) delete uploadData['undefined'];
        return uploadData
    }

    const matchFields = (objSource, objTarget) => {
        const overlapKeys = Object.keys(objTarget).filter(k => Object.keys(objSource).includes(k));
        for ( let k in overlapKeys ) {
            objTarget[overlapKeys[k]] = objSource[overlapKeys[k]];
        }
        return objTarget;
    }

    // TODO store by the wallet address or profile ID
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

    const deleteUpdatingData = () => {
        window.localStorage.removeItem(dataStorageName);
    }

    return (
        // update should only be done via the update functions
        <dataContext.Provider 
            value={{
                ...extraArgs,
                data,
                updatedData,
                getLatestField,
                getLatestObject,
                getUploadReadyObject,
                updateData,
                updateDataByKey,
                updateDataByDropdownSelect,
                updateDataByPath,
                deleteUpdatingData
            }}
        >
            {children} 
        </dataContext.Provider>
    );
}

export default DataManager;