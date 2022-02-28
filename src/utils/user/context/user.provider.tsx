import { useEffect, useState, useContext, FC } from 'react';
import ProfileContext from './user.context';
import Web3Context from '../../web3/context/web3.context';
import { getPersonalProfile } from '../../web3/contract';
import ipfsUtils from '../../web3/ipfs/ipfs.utils';

import { FullProfile } from '../../../schema/profile/profile.interface';
import { FixLater } from '../../../schema/helper.interface';
import UserContext from "./user.context";

const ProfileProvider : FC = ({ children }) => {
    
    const web3Context = useContext(Web3Context);
    // fetch profile from the graph / blockchain if web3provider is connected
    // then, fetch ipfs data by cid, populate the profile object and storage in local storage for fast retrieval
    // only the top level identity field is populated
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
    };

    const [ profile, setProfile ] = useState<FullProfile>(profileObj);

    useEffect(() => {
        if (web3Context.providers.selected){
            fetchUserProfile();
        }
    }, [web3Context.providers.selected, web3Context.providers]);

    const fetchUserProfile = async () => {
        // only reset profile if the address from the provider is connected to a different profile
        let userProfile: FullProfile  = await getPersonalProfile(web3Context);
        console.log('HomePage: User profile updated', userProfile);
        if(userProfile.identityID != null) {
            // if (userProfile.identityID === profile?.identityID) return;
            let profileJson = await ipfsUtils.getContentJson(userProfile.identityID);
            console.log(profileJson);
            if ( profileJson ) {
                let currentProfile : FullProfile = { ...userProfile, ...profileJson};
                console.log(currentProfile)
                setProfile(currentProfile);
            }
        }
    }

    // const matchFields = (objSource: FixLater, objTarget: FixLater) => {
    //     const overlapKeys = Object.keys(objTarget).filter(k => Object.keys(objSource).includes(k));
    //     for ( let k in overlapKeys ) {
    //         objTarget[overlapKeys[k]] = objSource[overlapKeys[k]];
    //     }
    //     return objTarget;
    // }


    return (
        <UserContext.Provider
            value={{
                profile: profile,
                setProfile: setProfile
            }}
        >
                {children}
        </UserContext.Provider>
    )
}

export default ProfileProvider;