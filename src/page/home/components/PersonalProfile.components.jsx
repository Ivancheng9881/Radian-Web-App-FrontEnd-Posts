import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { startRoute } from "../../../commons/route";
import RoundedButton from "../../../components/Button/Rounded.components";
import ipfsUtils from "../../../utils/web3/ipfs/ipfs.utils";

function PersonalProfile(props) {
    const history = useHistory();
    const { pid } = props;
    const [ updatedProfile, setUpdatedProfile ] = useState(null)

    useEffect(() => {
        if (pid !== undefined) {
            fetchProfile()
        }
    }, [pid]);

    const fetchProfile = async () => {
        console.log("Fetching profile pid", pid)
        if (pid) {
            let p = await ipfsUtils.getContentJson(pid.identityID);
            setUpdatedProfile(p);
        }
    };

    const createProfile = () => {
        history.push(startRoute)
    }
    return (
        <div className='p-2 pl-4 pr-4' style={{ height: '60vh', minWidth: '400px', minHeight: '480px'}}
        >
            <div className='bg-theme-bg-light rounded-lg w-full h-full overflow-hidden'>
                <div
                    className={`w-full h-full relative`}
                    style={{
                        backgroundImage: `url(${updatedProfile && ipfsUtils.getContentUrl(updatedProfile?.profilePictureCid)})`,
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover'
                    }}
                >
                    { 
                        updatedProfile ? 
                        <span className={`absolute w-fit text-theme-white 
                            pt-1.5 pb-1.5 pl-3 pr-3 rounded-lg left-2 bottom-2 opacity-80`}>
                            <div className='font-semibold text-3xl'>
                                {`${updatedProfile?.firstName} ${updatedProfile?.lastName}`}
                            </div>
                            <div className='font-normal text-sm'>
                                {`Height: ${updatedProfile?.height} ${updatedProfile?.heightUnit}`}
                            </div>
                            <div className='font-normal text-sm'>
                                {`Nationality: ${updatedProfile?.nationality}`}
                            </div>
                            <div className='font-normal text-sm'>
                                {`Current Location: ${updatedProfile?.location}`}
                            </div>
                        </span>
                        : <span className={`absolute w-full text-theme-white pt-1.5 pb-1.5 pl-3 pr-3 rounded-lg 
                        bottom-24 opacity-80 text-center`}>
                            <RoundedButton  onClick={createProfile}>
                                <span className='m-auto'>Create Profile Now</span>
                            </RoundedButton>
                        </span>

                    }
                </div>
            </div>
        </div>
    )
}

export default PersonalProfile;