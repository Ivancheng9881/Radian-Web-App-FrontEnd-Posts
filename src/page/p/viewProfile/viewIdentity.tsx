import { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import CustomTypography from '../../../components/Typography';
import ipfsUtils from '../../../utils/web3/ipfs/ipfs.utils';
import InfoDisplayGroup from '../../start/checkout/components/InfoDisplay/InfoDisplay.components';
import ProfilePictureFrame from '../../../components/ProfilePictureFrame';
import RoundedButton from '../../../components/Button/Rounded.components';
import { addAddressRoute } from '../../../commons/route';
import { Button } from 'antd';
import { FullProfile } from '../../../schema/profile/profile.interface';

interface PageProps {
    profile: FullProfile
}

const ViewIdentityInformation: FC<PageProps> = (props) => {

    const history = useHistory();
    
    const profile = props.profile;
    // const isSelf = props.isSelf;

    useEffect(()=>{
        window.scrollTo({ top: 40, behavior: 'smooth' });
    },[])

    // go to add wallet page
    const buttonHandler = ()=>{
        history.push(addAddressRoute);
    };

    const updateProfile = () => {}

    return (
        <div 
        className='p-2 pl-4 pr-4' 
        style={{ height: '60vh', minWidth: '400px', minHeight: '480px'}}
    >
        <div className='bg-theme-bg-light rounded-lg w-full h-full overflow-hidden'>
            <div
                className={`w-full h-full relative`}
                style={{
                    backgroundImage: ipfsUtils.getBkgdImageFromCDNFailover(profile?.profilePictureCid),
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
                    </span>

                }
            </div>
        </div>
    </div>

    );
};

export default ViewIdentityInformation;