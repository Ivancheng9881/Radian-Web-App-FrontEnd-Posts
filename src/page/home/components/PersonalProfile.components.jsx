import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router";
import { startRoute, createProfileRoute, profileRoute } from "../../../commons/route";
import RoundedButton from "../../../components/Button/Rounded.components";
import ipfsUtils from "../../../utils/web3/ipfs/ipfs.utils";
import ProfileContext from "../../../utils/profile/context/profile.context";
import Web3Context from "../../../utils/web3/context/web3.context";
import { Button } from "antd";
import { profileRouteBuilder } from "../../../utils/profile/routing.utils";

function PersonalProfile() {
    const history = useHistory();
    const profileContext = useContext(ProfileContext); // load profile info from provider
    const web3Context = useContext(Web3Context);
    const profile = profileContext.profile
    console.log("profile");
    console.log(profileContext);

    const connectWallet = () => {
        history.push(startRoute);
    }

    const createProfile = () => {
        history.push(createProfileRoute);
    }

    // to update profile
    const updateProfile = () => {
        let pathname = profileRouteBuilder(
            profile.network,
            profile.profileID,
        )
        history.push({pathname: pathname});
    }
    
    return (
        <div className='p-2 pl-4 pr-4' style={{ height: '60vh', minWidth: '400px', minHeight: '480px'}}
        >
            <div className='bg-theme-bg-light rounded-lg w-full h-full overflow-hidden'>
                <div
                    className={`w-full h-full relative`}
                    style={{
                        backgroundImage: `url(${profile.identityID && ipfsUtils.getContentUrl(profile?.profilePictureCid)})`,
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover'
                    }}
                >
                    {
                        profile.identityID && 
                            <div className="absolute right-5 bottom-5" onClick={updateProfile}>
                                <img src="/icons/right_arrow.svg" width="50px" height="50px" alt="menu" />
                            </div> // icon for update profile
                    }
                    { 
                        profile.identityID ?
                        <span className={`absolute w-fit text-theme-white bg-theme-bg-dark
                            pt-1.5 pb-1.5 pl-3 pr-3 rounded-lg left-2 bottom-2 opacity-80`}>
                            <div className='font-semibold text-3xl'>
                                {`${profile?.firstName} ${profile?.lastName}`}
                            </div>
                            <div className='font-normal text-sm'>
                                {`Gender: ${profile?.gender}`}
                            </div>
                            <div className='font-normal text-sm'>
                                {`Nationality: ${profile?.nationality}`}
                            </div>
                            <div className='font-normal text-sm'>
                                {`Interest: ${profile?.interest}`}
                            </div>
                        </span>
                        : <span className={`absolute w-full text-theme-white pt-1.5 pb-1.5 pl-3 pr-3 rounded-lg 
                        bottom-24 opacity-80 text-center`}>
                            { ! web3Context.providers[web3Context.providers.selected] ?
                            <Button
                                type='primary'
                                onClick={connectWallet}>
                                <span className='m-auto'>Connect Wallet</span>
                            </Button>
                            :
                            <div>
                                <Button 
                                    type='primary'
                                    onClick={createProfile}>
                                    <span className='m-auto'>Create Profile Now</span>
                                </Button>
                                <div className='pt-2'></div>
                                {/* <Button
                                    type='primary' 
                                    disabled={true}
                                >
                                    <span className='m-auto'>Attach to Existing Profile (Coming Soon)</span>
                                </Button> */}
                            </div>}
                        </span>

                    }
                </div>
            </div>
        </div>
    )
}

export default PersonalProfile;