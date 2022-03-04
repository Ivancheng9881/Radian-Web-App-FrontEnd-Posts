import { useEffect, useState, useContext, FC } from 'react';
import ProfileContext from '../socialApp/profile.context';
import DatingContext from './dating.context';
import DataManager from '../../../../utils/profile/data.manager';
import LocalStoreUtils from '../../../../utils/localStore';
import UserContext from '../../../../utils/user/context/user.context';
import ProfileDataManager from '../dataManager.utils';
import { UpdateManyMappingType } from '../dataManager.interface';

const profileObj = {
    location: "",
    weight: "",
    weightUnit: "",
    height: "",
    heightUnit: "",
    orientation: "",
    lookingFor: "",
    ageRangeMin: 18,
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
} as const;

const visibility = {
    location: {
        status: true,
        fields: ['location'],
    },
    weight: {
        status: true,
        fields: ['weight', 'weightUnit'],
    },
    height: {
        status: true,
        fields: ['height', 'heightUnit'],
    },
    orientation: {
        status: true,
        fields: ['orientation'],
    },
    lookingFor: {
        status: true,
        fields: ['lookingFor'],
    },
    ageRange: {
        status: true,
        fields: ['ageRangeMin', 'ageRangeMax', 'ageRangeIsDealBreaker'],
    },
    distance: {
        status: true,
        fields: ['distanceMax', 'distanceIsDealBreaker'],
    },
    datingEthnicity: {
        status: true,
        fields: ['datingEthnicity'],
    },
    datingReligion: {
        status: true,
        fields: ['datingEthnicity'],
    },
} as const;

const DatingProvider : FC = ({ children }) => {

    const storageKey = LocalStoreUtils.Key.TempDatingProfile;

    const { profile, setProfile } = useContext(UserContext);

    // const [ datingInfo, setDatingInfo ] = useState(datingInfoObj);
    const [ tempProfile, setTempProfile ] = useState<any>(profileObj);
    const [ visible, setVisible ] = useState<any>(visibility);

    useEffect(() => {
        let _profile = LocalStoreUtils.getJson(storageKey)
        if (!_profile) {
            _profile = profile;
        };
        _profile = ProfileDataManager.mapData(_profile, profileObj);
        setTempProfile(_profile);
    }, [profile]);

    // useEffect(() => {
    //     let datingInfo = profile?.application?.radianDating;
    //     if (! datingInfo){
    //         datingInfo = profile?.dataJson;
    //     }
    //     let newDatingInfo = Object.assign({}, datingInfoObj);
    //     delete newDatingInfo[undefined];
    //     newDatingInfo = datingInfo ? matchFields(datingInfo, newDatingInfo) : newDatingInfo;
    //     setDatingInfo(newDatingInfo);
    // }, [profile]);

    // const matchFields = (objSource, objTarget) => {
    //     const overlapKeys = Object.keys(objTarget).filter(k => Object.keys(objSource).includes(k));
    //     for ( let k in overlapKeys ) {
    //         objTarget[overlapKeys[k]] = objSource[overlapKeys[k]];
    //     }
    //     return objTarget;
    // }

    const storeData = (d: any) => {
        setTempProfile(d);
        LocalStoreUtils.setJson(storageKey, d);
    }

    const updateDataByKey = (key: string, val: any) => {
        let _profile = {
            ...tempProfile,
            [key]: val
        };
        storeData(_profile);
    };

    const updateMultiple = (mapping: UpdateManyMappingType) => {
        let _profile = { ...tempProfile, ...mapping };
        console.log(_profile)
        storeData(_profile);
    };

    const getVisibleProfile = () : any => {
        let vp: any = {...profileObj};
        Object.keys(visible).map((k: string) => {
            let o: any = visible[k];
            if (o.status) {
                o.fields.forEach((f: string) => {
                    vp[f] = tempProfile[f];
                })
            }
        })
        return vp;
    }

    return (
        <DatingContext.Provider
            value={{
                profile: tempProfile,
                setProfile: setTempProfile,
                updateDataByKey: updateDataByKey,
                updateMultiple: updateMultiple,
                visible: visible,
                setVisible: setVisible,
                getVisibleProfile: getVisibleProfile
            }}  
            // dataContext={DatingContext}
            // data={datingInfo}
            // dataObj={datingInfoObj}
            // dataStorageName={"tempDatingInfo"}
            // children={children}
            // extraArgs={{datingInfo}}
        >
            {children}
        </DatingContext.Provider>
    );
}

export default DatingProvider;
