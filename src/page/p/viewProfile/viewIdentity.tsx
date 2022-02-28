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
                    </span>

                }
            </div>
        </div>
    </div>

        // <div>
        //     <div className="pl-6 pr-6">
        //         <CustomTypography.Featured>RADIAN PROFILE</CustomTypography.Featured>
        //     </div>
        //     <div className="inline-flex md:flex-nowrap md:flex-row flex-wrap flex-col-reverse">
        //         <div className="w-auto md:w-2/3">
        //             <div className="mb-10">
        //             <div className="pl-6 pr-6 text-2xl mb-4 text-theme-white font-semibold text-center md:text-left">Addresses</div>
        //             <InfoDisplayGroup
        //                     profileKey="firstName"
        //                     label={`ERC-Addresses`}
        //                     value={"1 - 0x123456567789"}
        //                     stepName={`name`} />
        //             <InfoDisplayGroup
        //                     profileKey="firstName"
        //                     value={"2 - 0x123456567789"}
        //                     stepName={`name`} />
        //             <InfoDisplayGroup
        //                     profileKey="firstName"
        //                     value={"3 - 0x123456567789"}
        //                     stepName={`name`} />
        //             {/* Button to add Addresses */}
        //             {isSelf &&
        //             <div className="text-theme-white text-lg md:px-28 pt-10">
        //                 <div className="relative inline-flex align-center w-auto pb-2">
        //                     <RoundedButton
        //                         onClick={buttonHandler}>
        //                         Add Wallet
        //                     </RoundedButton>
        //                 </div>
        //             </div>}
        //             </div>
        //             <div className="pl-6 pr-6 text-2xl mb-4 text-theme-white font-semibold text-center md:text-left">Identity Information</div>
        //             <div className="inline-flex flex-wrap">
        //                 <InfoDisplayGroup
        //                     profileKey="firstName"
        //                     label={`First Name`}
        //                     value={latestProfile.firstName}
        //                     stepName={`name`} />
        //                 <InfoDisplayGroup
        //                     profileKey="lastName"
        //                     label={`Last Name`}
        //                     value={latestProfile.lastName}
        //                     stepName={`name`} />
        //                 <InfoDisplayGroup
        //                     profileKey={["day","month","year"]}
        //                     label={`Birthday`}
        //                     value={(latestProfile.day || latestProfile.month || latestProfile.year) && `${latestProfile.day}/${latestProfile.month}/${latestProfile.year}`}
        //                     stepName={`dob`}
        //                 />
        //                 <InfoDisplayGroup 
        //                     profileKey="gender" 
        //                     label={`Gender`} 
        //                     value={latestProfile.gender} 
        //                     stepName={`gender`} 
        //                 />
        //                 <InfoDisplayGroup
        //                     profileKey={["countryCode","number"]}
        //                     label={`Phone`}
        //                     value={(latestProfile.countryCode || latestProfile.number) && `${latestProfile.countryCode} ${latestProfile.number}`}
        //                     stepName={`phone`}
        //                 />
        //                 <InfoDisplayGroup
        //                     profileKey="nationality"
        //                     label={`Nationality`}
        //                     value={`${latestProfile.nationality}`}
        //                     stepName={`nationality`}CheckoutIdentityInforViewIdentityInformationmation
        //                 />
        //                 <InfoDisplayGroup
        //                     profileKey="interest"
        //                     label={`Interests`}
        //                     value={`${latestProfile.interest.map((i) => `${i}`)}`}
        //                     stepName={`interest`}
        //                 />
        //             </div>
        //         </div>
        //         <div className="w-auto md:w-1/3 mb-4">
        //             <div className="text-2xl mb-4 text-theme-white font-semibold text-center md:text-left">Profile Images</div>
        //             <div className='flex flex-wrap gap-5 justify-center md:justify-start'>
        //                 { (typeof latestProfile.profilePictureCid === 'string') ? 
        //                     <ProfilePictureFrame
        //                     key="profilePictureCid"
        //                     src={ipfsUtils.getContentUrl(latestProfile.profilePictureCid)} />
        //                     :
        //                     latestProfile.profilePictureCid.map((k,v) => {
        //                         return <ProfilePictureFrame
        //                                 key={`profilePictureCid_${v}`}
        //                                 src={ipfsUtils.getContentUrl(k)} />    
        //                     })
        //                 }
                        
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

export default ViewIdentityInformation;