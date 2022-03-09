import { useEffect, useState, useContext, FC } from 'react';
import ProfileContext from './profile.context';
import UserContext from '../../../../utils/user/context/user.context';
import Web3Context from '../../../../utils/web3/context/web3.context';
import { getPersonalProfile } from '../../../../utils/web3/contract/profileContract';
import ipfsUtils from '../../../../utils/web3/ipfs/ipfs.utils';

import { FullProfile } from '../../../../schema/profile/profile.interface';
import { FixLater } from '../../../../schema/helper.interface';
import LocalStoreUtils from '../../../../utils/localStore';
import Validator from '../../../../utils/validation';
import ProfileDataManager from '../dataManager.utils';

const profileObj: any = {
    firstName: "",
    lastName: "",
    day: "",
    month: "",
    year: "",
    countryCode: "",
    number: "",
    profilePictureCid: [],
    nationality: "",
    gender: "",
    interest: [],
    nft: [],
    application: {},
    identityID: "",
    dataJson: {},
    verificationJson: {},
    temp: {
        identityID: true,
        verificationJson: true,
        visible: true,
        dataJson: true,
        error: true
    }
} as const;

const visibility = {
    firstName: {
        status: true,
        fields: ['firstName'],
    },
    lastName: {
        status: true,
        fields: ['lastName'],
    },
    dob: {
        status: true,
        fields: ['day', 'month', 'year'],
    },
    phoneNumber: {
        status: true,
        fields: ['countryCode', 'number'],
    },
    profilePictureCid: {
        status: true,
        fields: ['profilePictureCid'],
    },
    nationality: {
        status: true,
        fields: ['nationality'],
    },
    gender: {
        status: true,
        fields: ['gender'],
    },
    interest: {
        status: true,
        fields: ['interest'],
    },
    nft: {
        status: true,
        fields: [],
    },
} as const;

const ProfileProvider : FC = ({ children }) => {
    
    const storageKey = LocalStoreUtils.Key.TempProfile;

    const web3Context = useContext(Web3Context);
    const { profile, setProfile } = useContext(UserContext);

    // fetch profile from the graph / blockchain if web3provider is connected
    // then, fetch ipfs data by cid, populate the profile object and storage in local storage for fast retrieval
    // only the top level identity field is populated
    const [ tempProfile, setTempProfile ] = useState(profileObj);
    const [ visible, setVisible ] = useState<any>(visibility);
    
    useEffect(() => {
        let _profile = LocalStoreUtils.getJson(storageKey)
        if (!_profile) {
            _profile = profile;
        };
        _profile = ProfileDataManager.mapData(_profile, profileObj);
        setTempProfile(_profile);
    }, [profile]);

    useEffect(() => {
        if (web3Context.providers.selected){
            fetchUserProfile();
        }
    }, [web3Context.providers.selected, web3Context.providers]);

    const fetchUserProfile = async () => {
        // only reset profile if the address from the provider is connected to a different profile
        try {
            let userProfile: FullProfile  = await getPersonalProfile(web3Context);
            if(userProfile.identityID != null) {
                // if (userProfile.identityID === profile?.identityID) return;
                let profileJson = await ipfsUtils.getContentJson(userProfile.identityID);
                if ( profileJson ) {
                    let currentProfile : FullProfile = { ...userProfile, ...profileJson};
                    setProfile(currentProfile);
                }
            }

        } catch(err) {
            console.log(err)
        }
    };

    const getVisibleProfile = () : FullProfile => {
        let vp: FullProfile = {...profileObj};
        console.log(tempProfile)
        Object.keys(visible).map((k: string) => {
            let o: any = visible[k];
            console.log(o);
            if (o.status) {
                o.fields.forEach((f: string) => {
                    vp[f] = tempProfile[f];
                })
            }
        })
        return vp;
    }

    const updateDataByKey = (key: string, val: any) => {
        let _profile = {
            ...tempProfile,
            [key]: val
        };
        setTempProfile(_profile)
        LocalStoreUtils.setJson(storageKey, _profile);
    }

    return <ProfileContext.Provider
                value={{
                    profile: tempProfile,
                    setProfile: setTempProfile,
                    updateDataByKey: updateDataByKey,
                    visible: visible,
                    setVisible: setVisible,
                    getVisibleProfile: getVisibleProfile
                }}
                // dataContext={ProfileContext}
                // data={profile}
                // dataObj={profileObj}
                // dataStorageName={"tempIdentity"}
                // extraArgs={{profile}} 
            >
                    {children}
            </ProfileContext.Provider>
}

export default ProfileProvider;