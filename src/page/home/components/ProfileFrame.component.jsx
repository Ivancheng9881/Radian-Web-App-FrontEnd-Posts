import { Card } from 'antd';
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
                    <Card
                        hoverable
                        cover={
                            <img 
                                src={ipfsUtils.getContentUrl(fullProfile.profilePictureCid)}
                                alt={fullProfile.firstName}
                            />
                        }
                        style={{
                            width: 300,
                            height: 200,
                            overflow: 'hidden',
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
                            <img
                                className="m-auto"
                                src={
                                    props.profile.network == 'erc'
                                    ? "/logos/polygonRounded.png"
                                    : "/logos/solanaRounded.png"
                                    }
                                width={30}
                                height={'auto'}
                            />
                        </span>
                    </Card>
                </div>
            )}
        </div>
    );
}

export default ProfileFrame;
