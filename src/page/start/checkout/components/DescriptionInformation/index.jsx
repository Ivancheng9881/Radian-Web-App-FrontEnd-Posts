import { useContext } from 'react';
import ProfilePictureFrame from '../../../../../components/ProfilePictureFrame';
import Typography from '../../../../../components/Typography';
import ipfsUtils from '../../../../../utils/web3/ipfs/ipfs.utils';
import CreateProfileContext from '../../../context/profile/profile.context';
import InfoDisplayGroup from '../InfoDisplay/InfoDisplay.components';

const CheckoutDescriptionInformation = () => {
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
                        <InfoDisplayGroup label={`Weight`} value={profile.weight} stepName={`weight`} />
                        <InfoDisplayGroup label={`Height`} value={profile.height} stepName={`height`} />
                        <InfoDisplayGroup label={`location`} value={profile.location} stepName={`location`} />`
                        <InfoDisplayGroup
                            label={`Interested in`}
                            value={profile.orientation}
                            stepName={`orientation`}
                        />
                        <InfoDisplayGroup
                            label={`Looking For`}
                            value={`${profile.lookingFor}`}
                            stepName={`lookingFor`}
                        />
                        <InfoDisplayGroup
                            label={`Interests`}
                            value={`${profile.interest.map((i) => `${i}, `)}`}
                            stepName={`interest`}
                        />
                        <InfoDisplayGroup
                            label={`Age Range`}
                            value={`${profile.ageRangeMin} - ${profile.ageRangeMax}`}
                            stepName={`ageRange`}
                        />
                        <InfoDisplayGroup
                            label={`Max Distance`}
                            value={`${profile.distanceMax} MILES`}
                            stepName={`distanceMax`}
                        />
                        <InfoDisplayGroup
                            label={`Looking For`}
                            value={`${profile.datingEthnicity.map((i) => `${i}, `)}`}
                            stepName={`datingEthnicity`}
                        />
                        <InfoDisplayGroup
                            label={`Looking For`}
                            value={`${profile.datingReligion.map((i) => `${i}, `)}`}
                            stepName={`datingReligion`}
                        />
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="text-2xl mb-4 text-theme-white font-semibold">Identity Information</div>
                    <div>
                        <ProfilePictureFrame src={ipfsUtils.getContentUrl(profile.profilePictureCid)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutDescriptionInformation;
