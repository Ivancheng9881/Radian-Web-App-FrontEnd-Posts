import { useEffect, useState, useContext } from 'react';
import ProfileContext from '../../../../utils/profile/context/profile.context';
import DatingContext from './dating.context';
import DataManager from '../../../../utils/profile/data.manager';

function DatingProvider({ children }) {

    const {profile, updatedData, updateDataByPath } = useContext(ProfileContext);
    console.log("Profile", profile);

    const datingInfoObj = {
        location: "",
        weight: "",
        weightUnit: "",
        height: "",
        heightUnit: "",
        orientation: "",
        lookingFor: "",
        ageRangeMin: 1,
        ageRangeMax: 100,
        ageRangeIsDealBreaker: 1,
        distanceMax: 1,
        distanceIsDealBreaker: 0,
        datingEthnicity: [],
        datingReligion: [],
        temp: {
            visible: true,
            error: true
        }
    };

    const [ datingInfo, setDatingInfo ] = useState(datingInfoObj);

    useEffect(() => {
        let datingInfo = profile?.application?.radianDating;
        if (! datingInfo){
            datingInfo = profile?.dataJson;
        }
        console.log("dating info", datingInfo);
        let newDatingInfo = Object.assign({}, datingInfoObj);
        delete newDatingInfo[undefined];
        newDatingInfo = datingInfo ? matchFields(datingInfo, newDatingInfo) : newDatingInfo;
        setDatingInfo(newDatingInfo);
    }, [profile]);

    const matchFields = (objSource, objTarget) => {
        const overlapKeys = Object.keys(objTarget).filter(k => Object.keys(objSource).includes(k));
        for ( let k in overlapKeys ) {
            objTarget[overlapKeys[k]] = objSource[overlapKeys[k]];
        }
        return objTarget;
    }

    // // propagate up to profile update on change
    // const dataChangeHandle = (d) => { 
    //     if (updatedData != {}){
    //         updateDataByPath(['application', 'radianDating'], d); 
    //     }
    // }

    return (
        <DataManager
            dataContext={DatingContext}
            data={datingInfo}
            dataObj={datingInfoObj}
            dataStorageName={"tempDatingInfo"}
            children={children}
            extraArgs={{datingInfo}}
        >
        </DataManager>
    );
}

export default DatingProvider;
