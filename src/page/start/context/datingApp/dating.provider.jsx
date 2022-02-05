import { useEffect, useState, useContext } from 'react';
import ProfileContext from '../../../../utils/profile/context/profile.context';
import DatingContext from './dating.context';
import DataManager from '../../../../utils/profile/data.manager';

function DatingProvider({ children }) {

    const {profile, updateDataByPath } = useContext(ProfileContext);

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

    useEffect(() => {
        const datingInfo = profile?.dataJson?.application?.radianDating;
        let newDatingInfo = Object.assign({}, datingInfoObj);
        newDatingInfo = datingInfo ? matchFields(datingInfo, newDatingInfo) : newDatingInfo;
        setDatingInfo(newDatingInfo);
    }, [profile?.dataJson]);

    const matchFields = (objSource, objTarget) => {
        const overlapKeys = Object.keys(objTarget).filter(k => Object.keys(objSource).includes(k));
        for ( let k in overlapKeys ) {
            objTarget[overlapKeys[k]] = objSource[overlapKeys[k]];
        }
        return objTarget;
    }

    // propagate up to profile update on change
    const dataChangeHandle = (d) => { updateDataByPath(['application', 'radianDating'], d); }

    return (
        <DataManager
            dataContext={DatingContext} 
            dataObj={datingInfoObj}
            data={profile?.application?.radianDating}
            dataStorageName={"tempDatingInfo"}
            datachangehandler={dataChangeHandle}
            children={children}
            extraArgs={{datingInfo}}
        >
        </DataManager>
    );
}

export default DatingProvider;
