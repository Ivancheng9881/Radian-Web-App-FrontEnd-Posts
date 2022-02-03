import { useEffect, useState, useContext } from 'react';
import ProfileContext from './profile.context';
import Web3Context from '../../web3/context/web3.context';
import Validator from '../../../utils/validation';
import { getPersonalProfile } from '../../web3/contract';
import ipfsUtils from '../../web3/ipfs/ipfs.utils';

function ProfileProvider({ children }) {
    
    const web3Context = useContext(Web3Context);
    // fetch profile from the graph / blockchain if web3provider is connected
    // then, fetch ipfs data by cid, populate the profile object and storage in local storage for fast retrieval
    // only the top level identity field is populated
    const profileObj = {
        identity: {
            firstName: null,
            lastName: null,
            day: null,
            month: null,
            year: null,
            countryCode: null,
            number: null,
            profilePictureCid: [],
            nationality: null,
            gender: null,
            interest: [],
            nft: []
        },
        dataJson: {},
        identityID: null,
        verificationJson: {}
    };

    const [ profile, setProfile ] = useState(null);
    const [ updatedProfile, setUpdatedProfile ] = useState(profileObj);

    useEffect(()=>{
        // load the cached updated content of the identity
        loadUpdatingIdentity();
    }, []);

    // TODO websocket for fetching data from graph or node

    useEffect(() => {
        if (web3Context.providers.selected != null){
            fetchUserProfile();
            return () => setProfile(null);
        }
    }, [web3Context.providers.selected, web3Context.providers]);

    const fetchUserProfile = async () => {
        // only reset profile if the address from the provider is connected to a different profile
        const userProfile  = await getPersonalProfile(web3Context);
        console.log('HomePage: User profile updated', userProfile);
        if(userProfile != null || undefined) {
            if (userProfile.identityID === profile?.identityID) return;
            setProfile(null);
            let profileJson = await ipfsUtils.getContentJson(userProfile.identityID);
            if ( profileJson ) {
                let newProfile = Object.assign({}, profileObj);
                parseProfileJson(newProfile, profileJson);
                newProfile.identityID = userProfile.identityID; // set cid for versioning
                setProfile(newProfile);
            }
        }
    }

    const parseProfileJson = (newProfile, profileJson) => {
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
        // update should only be done via the update functions
        <ProfileContext.Provider 
            value={{
                profile,
                updatedProfile,
                getLatestField,
                updateProfile,
                updateProfileByKey,
                updateProfileByDropdownSelect
            }}
        >
            {children} 
        </ProfileContext.Provider>
    );
}

export default ProfileProvider;
