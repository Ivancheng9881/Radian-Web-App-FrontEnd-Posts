import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ipfsUtils from '../../../utils/web3/ipfs/ipfs.utils';
import { profileRoute } from '../../../commons/route';

function ProfileFrame(props) {
    let defaultProfilePictureId = 'QmdxdBrd22pJdKZesdfYFwAkh9ZcRFCQ9SVKUVatSSY3Rh';
    const [ fullProfile, setFullProfile ] = useState(null);
    const history = useHistory();

    useEffect(
        () => {
            fetchProfile();
        },
        [ props.profile ]
    );

    const fetchProfile = async () => {
        let p = await ipfsUtils.getContentJson(props.profile.identityID);
        if (p.profilePictureCid == '' || p.profilePictureCid == undefined) {
            p.profilePictureCid = defaultProfilePictureId;
        }
        setFullProfile(p);
    };

    
    // to update profile
    const updateProfile = ()=>{
        history.push({pathname: `${profileRoute}/${props.profile.network}/${props.profile?.profileID}`});
    }

    return (
        <div className="">
            {fullProfile && (
                <div className="p-2">
                    <div
                        className={`h-40 w-80 rounded-lg relative`}
                        style={{
                            backgroundImage: `url(${ipfsUtils.getContentUrl(fullProfile.profilePictureCid)})`,
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover'
                        }}
                    >
                        <span
                            className={`absolute bg-theme-bg-dark w-fit text-theme-white 
                        pt-1.5 pb-1.5 pl-3 pr-3 rounded-lg left-2 bottom-2 opacity-80`}
                        >
                            <span className="">{`${fullProfile.firstName} ${fullProfile.lastName}`}</span>

                        </span>
                        <span
                            className={`absolute w-fit text-theme-white 
                        pt-1.5 pb-1.5 pl-3 pr-3 rounded-lg right-0 top-0 opacity-80`}
                        >
                            {props.profile.network =="ERC" ? 
                                <img
                                className="m-auto"
                                src="/logos/polygonRounded.png"
                                width={30}
                                height={'auto'}
                                />
                                : 
                                <img
                                className="m-auto"
                                src="/logos/solanaRounded.png"
                                width={30}
                                height={'auto'}
                                />
                            }
                        </span>

                        <span
                            className={`absolute w-fit text-theme-white
                        pt-1.5 pb-1.5 pl-3 pr-3 rounded-lg right-0 bottom-0 opacity-80` } 
                        onClick={updateProfile}
                        >
                        <img src="/icons/right_arrow.svg" width="30px" height="30px" alt="right_arrow" />
                        </span>

                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileFrame;
