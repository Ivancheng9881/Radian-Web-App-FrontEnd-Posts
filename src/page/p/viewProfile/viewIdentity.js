import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Typography from '../../../components/Typography';
import ipfsUtils from '../../../utils/web3/ipfs/ipfs.utils';
import InfoDisplayGroup from '../../start/checkout/components/InfoDisplay/InfoDisplay.components';
import ProfilePictureFrame from '../../../components/ProfilePictureFrame';
import RoundedButton from '../../../components/Button/Rounded.components';
import { addAddressRoute } from '../../../commons/route';

const ViewIdentityInformation = (props) => {

    const history = useHistory();
    
    const latestProfile = props.profile;
    const isSelf = props.isSelf;

    useEffect(()=>{
        window.scrollTo({ top: 40, behavior: 'instant' });
    },[])

    // go to add wallet page
    const buttonHandler = ()=>{
        history.push(addAddressRoute);
    }

    return (
        <div>
            <div className="pl-6 pr-6">
                <Typography.Featured>RADIAN PROFILE</Typography.Featured>
            </div>
            <div className="inline-flex md:flex-nowrap md:flex-row flex-wrap flex-col-reverse">
                <div className="w-auto md:w-2/3">
                    <div className="mb-10">
                    <div className="pl-6 pr-6 text-2xl mb-4 text-theme-white font-semibold text-center md:text-left">Addresses</div>
                    <InfoDisplayGroup
                            profileKey="firstName"
                            label={`ERC-Addresses`}
                            value={"1 - 0x123456567789"}
                            stepName={`name`} />
                    <InfoDisplayGroup
                            profileKey="firstName"
                            value={"2 - 0x123456567789"}
                            stepName={`name`} />
                    <InfoDisplayGroup
                            profileKey="firstName"
                            value={"3 - 0x123456567789"}
                            stepName={`name`} />
                    {/* Button to add Addresses */}
                    {isSelf &&
                    <div className="text-theme-white text-lg md:px-28 pt-10">
                        <div className="relative inline-flex align-center w-auto pb-2">
                            <RoundedButton
                                onClick={buttonHandler}>
                                Add Wallet
                            </RoundedButton>
                        </div>
                    </div>}
                    </div>
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
                            value={(latestProfile.day || latestProfile.month || latestProfile.year) && `${latestProfile.day}/${latestProfile.month}/${latestProfile.year}`}
                            stepName={`dob`}
                        />
                        <InfoDisplayGroup 
                            profileKey="gender" 
                            label={`Gender`} 
                            value={latestProfile.gender} 
                            stepName={`gender`} 
                        />
                        <InfoDisplayGroup
                            profileKey={["countryCode","number"]}
                            label={`Phone`}
                            value={(latestProfile.countryCode || latestProfile.number) && `${latestProfile.countryCode} ${latestProfile.number}`}
                            stepName={`phone`}
                        />
                        <InfoDisplayGroup
                            profileKey="nationality"
                            label={`Nationality`}
                            value={`${latestProfile.nationality}`}
                            stepName={`nationality`}CheckoutIdentityInforViewIdentityInformationmation
                        />
                        <InfoDisplayGroup
                            profileKey="interest"
                            label={`Interests`}
                            value={`${latestProfile.interest.map((i) => `${i}`)}`}
                            stepName={`interest`}
                        />
                    </div>
                </div>
                <div className="w-auto md:w-1/3 mb-4">
                    <div className="text-2xl mb-4 text-theme-white font-semibold text-center md:text-left">Profile Images</div>
                    <div className='flex flex-wrap gap-5 justify-center md:justify-start'>
                        { (typeof latestProfile.profilePictureCid === 'string') ? 
                            <ProfilePictureFrame
                            key="profilePictureCid"
                            src={ipfsUtils.getContentUrl(latestProfile.profilePictureCid)} />
                            :
                            latestProfile.profilePictureCid.map((k,v) => {
                                return <ProfilePictureFrame
                                        key={`profilePictureCid_${v}`}
                                        src={ipfsUtils.getContentUrl(k)} />    
                            })
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewIdentityInformation;