import React, { useEffect, useState } from 'react';
import ipfsUtils from '../../../utils/web3/ipfs/ipfs.utils';

function ProfileFrame(props) {
    let defaultProfilePictureId = 'QmdxdBrd22pJdKZesdfYFwAkh9ZcRFCQ9SVKUVatSSY3Rh';
    const [ fullProfile, setFullProfile ] = useState(null);

    useEffect(
        () => {
            fetchProfile();
        },
        [ props.profile ]
    );

    const fetchProfile = async () => {
        let p = await ipfsUtils.getContentJson(props.profile.identityID);
        console.log(p);
        if (p.profilePictureCid == '' || p.profilePictureCid == undefined) {
            p.profilePictureCid = defaultProfilePictureId;
        }
        setFullProfile(p);
    };

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
                            {props.profile.network =="erc" ? 
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
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileFrame;
