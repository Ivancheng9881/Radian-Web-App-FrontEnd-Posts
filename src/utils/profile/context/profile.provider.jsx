import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ProfileContext from './profile.context';
import { getQuery, setQuery } from '../../../utils/query';
import { checkoutProfileRoute, startRoute } from '../../../commons/route';
import Validator from '../../../utils/validation';

function ProfileProvider({ children }) {

    // fetch profile from the graph / blockchain if web3provider is connected
    // then, fetch ipfs data by cid, populate the profile object and storage in local storage for fast retrieval
    // only the top level identity field is populated
    useEffect(()=>{
        
    })

    const initProfile = {
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
        verification: ""
    };

    const [ profile, setProfile ] = useState(initProfile);
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
