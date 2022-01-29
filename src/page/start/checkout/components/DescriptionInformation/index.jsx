import { useContext } from 'react';
import ProfilePictureFrame from '../../../../../components/ProfilePictureFrame';
import Typography from '../../../../../components/Typography';
import ipfsUtils from '../../../../../utils/web3/ipfs/ipfs.utils';
import CreateProfileContext from '../../../context/profile/profile.context';
import InfoDisplayGroup from '../InfoDisplay/InfoDisplay.components';

const CheckoutDescriptionInformation = () => {
    const { profile } = useContext(CreateProfileContext);
    
    return (
        <div className="RD-CheckoutPage-scrollbar h-full overflow-scroll" style={{ maxHeight: 560 }}>
            <div className="pl-6 pr-6">
                <Typography.Featured>RADIAN Passport Summary</Typography.Featured>
            </div>
            <div className="inline-flex">
                <div className="w-2/3">
                    <div className="pl-6 pr-6 text-2xl mb-2 text-theme-white font-semibold">Identity Information</div>
                    <div className="inline-flex flex-wrap">
                        <InfoDisplayGroup profileKey="weight" label={`Weight`} value={profile.weight} stepName={`weight`} />
                        <InfoDisplayGroup profileKey="height" label={`Height`} value={profile.height} stepName={`height`} />
                        <InfoDisplayGroup profileKey="location" label={`location`} value={profile.location} stepName={`location`} />`
                        <InfoDisplayGroup
                            profileKey="orientation"
                            label={`Interested in`}
                            value={profile.orientation}
                            stepName={`orientation`}
                        />
                        <InfoDisplayGroup
                            profileKey="lookingFor"
                            label={`Looking For`}
                            value={`${profile.lookingFor}`}
                            stepName={`lookingFor`}
                        />
                        <InfoDisplayGroup
                            profileKey="interest"
                            label={`Interests`}
                            value={`${profile.interest.map((i) => `${i}, `)}`}
                            stepName={`interest`}
                        />
                        <InfoDisplayGroup
                            profileKey={["ageRangeMin","ageRangeMax"]}
                            label={`Age Range`}
                            value={`${profile.ageRangeMin} - ${profile.ageRangeMax}`}
                            stepName={`ageRange`}
                        />
                        <InfoDisplayGroup
                            profileKey="distanceMax"
                            label={`Max Distance`}
                            value={`${profile.distanceMax} MILES`}
                            stepName={`distanceMax`}
                        />
                        <InfoDisplayGroup
                            profileKey="datingEthnicity"
                            label={`Looking For`}
                            value={`${profile.datingEthnicity.map((i) => `${i}, `)}`}
                            stepName={`datingEthnicity`}
                        />
                        <InfoDisplayGroup
                            profileKey="datingReligion"
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
