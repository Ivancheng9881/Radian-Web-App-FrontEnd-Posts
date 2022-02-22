import { useContext, useEffect } from 'react';
import ProfilePictureFrame from '../../../../../components/ProfilePictureFrame';
import Typography from '../../../../../components/Typography';
import ipfsUtils from '../../../../../utils/web3/ipfs/ipfs.utils';
import InfoDisplayGroup from '../InfoDisplay/InfoDisplay.components';
import ProfileContext from '../../../../../utils/profile/context/profile.context';

const CheckoutIdentityInformation = () => {
    const { getLatestObject, updateDataByPath } = useContext(ProfileContext);
    let latestProfile = getLatestObject();

    useEffect(()=>{
        window.scrollTo({ top: 40, behavior: 'instant' });
    },[])

    return (
        <div>
            <div className="pl-6 pr-6">
                <Typography.Featured>RADIAN Passport Summary</Typography.Featured>
            </div>
            <div className="inline-flex md:flex-nowrap md:flex-row flex-wrap flex-col-reverse">
                <div className="w-auto md:w-2/3">
                    <div className="pl-6 pr-6 text-2xl mb-4 text-theme-white font-semibold text-center md:text-left">Identity Information</div>
                    <div className="inline-flex flex-wrap">
                        <InfoDisplayGroup
                            profileKey="firstName"
                            label={`First Name`}
                            value={latestProfile.firstName}
                            stepName={`name`} />
                        <InfoDisplayGroup
                            profileKey="lastName"
                            label={`Last Name`}
                            value={latestProfile.lastName}
                            stepName={`name`} />
                        <InfoDisplayGroup
                            profileKey={["day","month","year"]}
                            label={`Birthday`}
                            value={latestProfile.day || latestProfile.month || latestProfile.year && `${latestProfile.day}/${latestProfile.month}/${latestProfile.year}`}
                            visibleUpdate={updateDataByPath}
                            visibilityData={latestProfile.visible}
                            stepName={`dob`}
                        />
<<<<<<< HEAD
=======
<<<<<<< HEAD
                        <InfoDisplayGroup profileKey="gender" label={`Gender`} value={profile.gender} stepName={`orientation`} />
=======
>>>>>>> d868c4b43c288fc809d84ef4ae6924a0ca42a407
                        <InfoDisplayGroup 
                            profileKey="gender" 
                            label={`Gender`} 
                            value={latestProfile.gender} 
                            visibleUpdate={updateDataByPath}
                            visibilityData={latestProfile.visible}
                            stepName={`gender`} 
                        />
<<<<<<< HEAD
=======
>>>>>>> validation
>>>>>>> d868c4b43c288fc809d84ef4ae6924a0ca42a407
                        <InfoDisplayGroup
                            profileKey={["countryCode","number"]}
                            label={`Phone`}
                            value={(latestProfile.countryCode || latestProfile.number) && `${latestProfile.countryCode} ${latestProfile.number}`}
                            visibleUpdate={updateDataByPath}
                            visibilityData={latestProfile.visible}
                            stepName={`phone`}
                        />
                        <InfoDisplayGroup
                            profileKey="nationality"
                            label={`Nationality`}
                            value={`${latestProfile.nationality}`}
                            visibleUpdate={updateDataByPath}
                            visibilityData={latestProfile.visible}
                            stepName={`nationality`}
                        />
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> d868c4b43c288fc809d84ef4ae6924a0ca42a407
                        <InfoDisplayGroup
                            profileKey="interest"
                            label={`Interests`}
                            value={`${latestProfile.interest.map((i) => `${i}`)}`}
                            visibleUpdate={updateDataByPath}
                            visibilityData={latestProfile.visible}
                            stepName={`interest`}
                        />
<<<<<<< HEAD
=======
>>>>>>> validation
>>>>>>> d868c4b43c288fc809d84ef4ae6924a0ca42a407
                    </div>
                </div>
                <div className="w-auto md:w-1/3 mb-4">
                    <div className="text-2xl mb-4 text-theme-white font-semibold text-center md:text-left">Profile Images</div>
                    <div className='flex flex-wrap gap-5 justify-center md:justify-start'>
                        { (typeof latestProfile.profilePictureCid === 'string') ? 
                            <ProfilePictureFrame
                            profileKey="profilePictureCid"
                            src={ipfsUtils.getContentUrl(latestProfile.profilePictureCid)} />
                            :
                            latestProfile.profilePictureCid.map((k,v) => {
                                return <ProfilePictureFrame
                                        profileKey={`profilePictureCid_${v}`}
                                        src={ipfsUtils.getContentUrl(k)} />    
                            })
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutIdentityInformation;
