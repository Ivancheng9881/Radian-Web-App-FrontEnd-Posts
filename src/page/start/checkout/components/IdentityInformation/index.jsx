import { useContext } from 'react';
import ProfilePictureFrame from '../../../../../components/ProfilePictureFrame';
import Typography from '../../../../../components/Typography';
import ipfsUtils from '../../../../../utils/web3/ipfs/ipfs.utils';
import CreateProfileContext from '../../../context/profile/profile.context';
import InfoDisplayGroup from '../InfoDisplay/InfoDisplay.components';

const CheckoutIdentityInformation = () => {
    const { profile } = useContext(CreateProfileContext);

    return (
        <div>
            <div className="pl-6 pr-6">
                <Typography.Featured>RADIAN Passport Summary</Typography.Featured>
            </div>
            <div className="inline-flex">
                <div className="w-2/3 ">
                    <div className="pl-6 pr-6 text-2xl mb-4 text-theme-white font-semibold">Identity Information</div>
                    <div className="inline-flex flex-wrap">
                        <InfoDisplayGroup
                            profileKey="firstName"
                            label={`First Name`}
                            value={profile.firstName}
                            stepName={`name`} />
                        <InfoDisplayGroup
                            profileKey="lastName"
                            label={`Last Name`}
                            value={profile.lastName}
                            stepName={`name`} />
                        <InfoDisplayGroup
                            profileKey={["day","month","year"]}
                            label={`Birthday`}
                            value={`${profile.day}/${profile.month}/${profile.year}`}
                            stepName={`dob`}
                        />`
                        <InfoDisplayGroup profileKey="gender" label={`Gender`} value={profile.gender} stepName={`orientation`} />
                        <InfoDisplayGroup
                            profileKey={["countryCode","number"]}
                            label={`Phone`}
                            value={`${profile.countryCode} ${profile.number}`}
                            stepName={`phone`}
                        />
                        <InfoDisplayGroup
                            profileKey="nationality"
                            label={`Nationality`}
                            value={`${profile.nationality}`}
                            stepName={`nationality`}
                        />`
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="text-2xl mb-4 text-theme-white font-semibold">Identity Information</div>
                    <div>
                        <ProfilePictureFrame
                            profileKey="profilePictureCid"
                            src={ipfsUtils.getContentUrl(profile.profilePictureCid)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutIdentityInformation;
