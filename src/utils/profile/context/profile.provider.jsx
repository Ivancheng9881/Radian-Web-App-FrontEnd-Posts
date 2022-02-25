import { useEffect, useState, useContext } from 'react';
import ProfileContext from './profile.context';
import Web3Context from '../../web3/context/web3.context';
import { getPersonalProfile } from '../../web3/contract';
import ipfsUtils from '../../web3/ipfs/ipfs.utils';

import DataManager from '../data.manager';

function ProfileProvider({ children }) {
    
    const web3Context = useContext(Web3Context);
    // fetch profile from the graph / blockchain if web3provider is connected
    // then, fetch ipfs data by cid, populate the profile object and storage in local storage for fast retrieval
    // only the top level identity field is populated
    const profileObj = {
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
    };

    const [ profile, setProfile ] = useState(profileObj);

    useEffect(() => {
        if (web3Context.providers.selected != null){
            fetchUserProfile();
            return () => setProfile(profileObj);
        }
    }, [web3Context.providers.selected, web3Context.providers]);

    const fetchUserProfile = async () => {
        // only reset profile if the address from the provider is connected to a different profile
        const userProfile  = await getPersonalProfile(web3Context);
        console.log('HomePage: User profile updated', userProfile);
        if(userProfile != null || undefined) {
            if (userProfile.identityID === profile?.identityID) return;
            let profileJson = await ipfsUtils.getContentJson(userProfile.identityID);
            console.log(profileJson);
            if ( profileJson ) {
                let newProfile = Object.assign({}, profileObj);
                delete newProfile["undefined"];
                newProfile = matchFields(profileJson, newProfile);
                newProfile['identityID'] = userProfile.identityID; // set cid for versioning
                newProfile['dataJson'] = profileJson;
                newProfile['profileID'] = userProfile.profileID;
                newProfile['network'] = userProfile.network
                setProfile(newProfile);
            }
        }
    }

    const matchFields = (objSource, objTarget) => {
        const overlapKeys = Object.keys(objTarget).filter(k => Object.keys(objSource).includes(k));
        for ( let k in overlapKeys ) {
            objTarget[overlapKeys[k]] = objSource[overlapKeys[k]];
        }
        return objTarget;
    }

    return <DataManager
                dataContext={ProfileContext}
                data={profile}
                dataObj={profileObj}
                dataStorageName={"tempIdentity"}
                children={children}
                extraArgs={{profile}} >
            </DataManager>
}

export default ProfileProvider;