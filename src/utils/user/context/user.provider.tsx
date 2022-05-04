import { useEffect, useState, useContext, FC } from 'react';
import Web3Context from '../../web3/context/web3.context';
import { getPersonalProfile } from '../../web3/contract/profileContract';
import ipfsUtils from '../../web3/ipfs/ipfs.utils';
import { FullProfile } from '../../../schema/profile/profile.interface';
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
    const [ authToken, setAuthToken ] = useState<string>('');

    useEffect(() => {
        const _authToken = localStorage.getItem('radian:auth:jwt');
        setAuthToken(_authToken)
    }, [])

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
                    let currentProfile : FullProfile = {  ...profileJson, ...userProfile,};
                    setProfile(currentProfile);
                }
            }
        } catch(err: any) {
            console.log(err);
            if (err.code == 4200) {
                setProfile(profileObj)
            }
        }
    }

    return (
        <UserContext.Provider
            value={{
                profile: profile,
                setProfile: setProfile,
                refreshProfile: fetchUserProfile,
                authToken: authToken,
                setAuthToken: setAuthToken,
            }}
        >
                {children}
        </UserContext.Provider>
    )
}

export default ProfileProvider;