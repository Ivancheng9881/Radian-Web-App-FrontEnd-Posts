import { useEffect, useState, useContext, FC } from 'react';
import ProfileContext from './user.context';
import Web3Context from '../../web3/context/web3.context';
import { getPersonalProfile } from '../../web3/contract';
import ipfsUtils from '../../web3/ipfs/ipfs.utils';

import { FullProfile } from '../../../schema/profile/profile.interface';
import { FixLater } from '../../../schema/helper.interface';
import UserContext from "./user.context";

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

const ProfileProvider : FC = ({ children }) => {
    
    const web3Context = useContext(Web3Context);
    // fetch profile from the graph / blockchain if web3provider is connected
    // then, fetch ipfs data by cid, populate the profile object and storage in local storage for fast retrieval
    // only the top level identity field is populated


    const [ profile, setProfile ] = useState<FullProfile>(profileObj);

    useEffect(() => {
        console.log('kayton@debug',web3Context)
        if (web3Context.providers.selected){
            fetchUserProfile();
        }
    }, [web3Context.providers.selected, web3Context.providers]);

    const fetchUserProfile = async () => {
        // only reset profile if the address from the provider is connected to a different profile
        try {
            let userProfile: FullProfile  = await getPersonalProfile(web3Context);
            console.log('kayton@debug', userProfile);
            if(userProfile.identityID != null) {
                // if (userProfile.identityID === profile?.identityID) return;
                let profileJson = await ipfsUtils.getContentJson(userProfile.identityID);
                console.log('kayton@debug', profileJson);
    
                if ( profileJson ) {
                    let currentProfile : FullProfile = {  ...profileJson, ...userProfile,};
                    setProfile(currentProfile);
                }
            }
        } catch(err) {
            console.log(err);
            setProfile(profileObj)
        }
    }

    return (
        <UserContext.Provider
            value={{
                profile: profile,
                setProfile: setProfile,
                refreshProfile: fetchUserProfile
            }}
        >
                {children}
        </UserContext.Provider>
    )
}

export default ProfileProvider;