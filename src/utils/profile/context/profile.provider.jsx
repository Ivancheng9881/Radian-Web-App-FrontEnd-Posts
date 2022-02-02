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
            firstName: '',
            lastName: '',
            day: '',
            month: '',
            year: '',
            countryCode: '',
            number: '',
            profilePictureCid: [],
            nationality: '',
            gender: '',
            interest: [],
            nft: []
        },
        applications: {},
        identityJson: {},
        verificationJson: {}
    };

    const [ profile, setProfile ] = useState(null);


    useEffect(() => {
        if (web3Context.selectedProvider != null){
            setProfile(null);
            fetchUserProfile();
            return () => setProfile([]);
        }
    }, [web3Context.selectedProvider])

    const fetchUserProfile = async () => {
        const userProfile  = await getPersonalProfile(web3Context);
        console.log('HomePage: User profile updated', userProfile);
        if(userProfile != null || undefined ) {
            let profileJson = await ipfsUtils.getContentJson(userProfile.identityID);
            if ( profileJson ) {
                parseProfileJson(profileJson);
            }
        }
    }

    const parseProfileJson = (profileJson) => {
        if ( profileJson.identity ) {
            profileObj.identity = matchFields(profileJson.identity, profileObj.identity);
        } else {
            profileObj.identity = matchFields(profileJson, profileObj.identity)
        }
        profileObj.identityJson = profileJson;
        setProfile(profileObj);
    }

    const matchFields = (objSource, objTarget) => {
        const overlapKeys = Object.keys(objTarget).filter(k => Object.keys(objSource).includes(k));
        console.log(overlapKeys);
        for ( let k in overlapKeys ) {
            objTarget[overlapKeys[k]] = objSource[overlapKeys[k]];
        }
        return objTarget;
    }

    const [ scrollDirection, setScrollDirection ] = useState(true);

    const storeTempProfile = () => {
        window.localStorage.setItem('tempProfile', JSON.stringify(profile));
    };

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

        // console.log('validatorResult', validatorResult);
        setProfile({
            ...profile,
            error: validatorResult,
            [e.target.name]: e.target.value
        });
    };

    //Country Code Selection
    const updateProfileByDropdownSelect = (key, val) => {
        setProfile({
            ...profile,
            [key]: val
        });
    };

    const updateProfileByKey = (key, val, type = '') => {
        let validatorResult = Validator.validateInput(val, type);
        setProfile({
            ...profile,
            error: validatorResult,
            [key]: val
        });
    };

    return (
        <ProfileContext.Provider
            value={{
                profile,
                setProfile,
                updateProfile,
                updateProfileByKey,
                updateProfileByDropdownSelect,
                scrollDirection,
                setScrollDirection,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
}

export default ProfileProvider;
