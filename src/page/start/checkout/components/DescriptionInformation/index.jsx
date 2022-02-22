import { useContext, useEffect } from 'react';
import ProfilePictureFrame from '../../../../../components/ProfilePictureFrame';
import Typography from '../../../../../components/Typography';
import ipfsUtils from '../../../../../utils/web3/ipfs/ipfs.utils';
import DatingContext from '../../../context/datingApp/dating.context';
import InfoDisplayGroup from '../InfoDisplay/InfoDisplay.components';

const CheckoutDescriptionInformation = () => {
    const { getLatestObject, updateDataByPath } = useContext(DatingContext);
    let latestDatingInfo = getLatestObject();

    useEffect(()=>{
        window.scrollTo({ top: 40, behavior: 'instant' });
    },[])

    return (
        <div>
            <div className="pl-6 pr-6">
                <Typography.Featured>RADIAN Passport Summary</Typography.Featured>
            </div>
            <div className="inline-flex">
                <div className="w-2/3">
                    <div className="pl-6 pr-6 text-2xl mb-2 text-theme-white font-semibold">Dating Information</div>
                    <div className="inline-flex flex-wrap">
<<<<<<< HEAD
=======
<<<<<<< HEAD
                        <InfoDisplayGroup profileKey="weight" label={`Weight`} value={profile.weight} stepName={`weight`} />
                        <InfoDisplayGroup profileKey="height" label={`Height`} value={profile.height} stepName={`height`} />
                        <InfoDisplayGroup profileKey="location" label={`location`} value={profile.location} stepName={`location`} />
=======
>>>>>>> d868c4b43c288fc809d84ef4ae6924a0ca42a407
                        <InfoDisplayGroup 
                            profileKey="weight" 
                            label={`Weight`} 
                            value={latestDatingInfo.weight}
                            visibleUpdate={updateDataByPath}
                            visibilityData={latestDatingInfo.visible}
                            stepName={`weight`} />
                        <InfoDisplayGroup 
                            profileKey="height" 
                            label={`Height`} 
                            value={latestDatingInfo.height} 
                            visibleUpdate={updateDataByPath}
                            visibilityData={latestDatingInfo.visible}
                            stepName={`height`} />
<<<<<<< HEAD
=======
                        <InfoDisplayGroup 
                            profileKey="location" 
                            label={`location`} 
                            value={latestDatingInfo.location}
                            visibleUpdate={updateDataByPath} 
                            visibilityData={latestDatingInfo.visible}
                            stepName={`location`} />
>>>>>>> validation
>>>>>>> d868c4b43c288fc809d84ef4ae6924a0ca42a407
                        <InfoDisplayGroup
                            profileKey="orientation"
                            label={`Interested in`}
                            value={latestDatingInfo.orientation}
                            visibleUpdate={updateDataByPath}
                            visibilityData={latestDatingInfo.visible}
                            stepName={`orientation`}
                        />
                        <InfoDisplayGroup
                            profileKey="lookingFor"
                            label={`Looking For`}
                            value={`${latestDatingInfo.lookingFor}`}
                            visibleUpdate={updateDataByPath}
                            visibilityData={latestDatingInfo.visible}
                            stepName={`lookingFor`}
                        />
                        <InfoDisplayGroup
                            profileKey={["ageRangeMin","ageRangeMax"]}
                            label={`Age Range`}
                            value={`${latestDatingInfo.ageRangeMin} - ${latestDatingInfo.ageRangeMax}`}
                            visibleUpdate={updateDataByPath}
                            visibilityData={latestDatingInfo.visible}
                            stepName={`ageRange`}
                        />
                        <InfoDisplayGroup
                            profileKey="distanceMax"
                            label={`Max Distance`}
                            value={`${latestDatingInfo.distanceMax} MILES`}
                            visibleUpdate={updateDataByPath}
                            visibilityData={latestDatingInfo.visible}
                            stepName={`distanceMax`}
                        />
                        <InfoDisplayGroup
                            profileKey="datingEthnicity"
                            label={`Looking For`}
                            value={`${latestDatingInfo.datingEthnicity.map((i) => `${i}`)}`}
                            visibleUpdate={updateDataByPath}
                            visibilityData={latestDatingInfo.visible}
                            stepName={`datingEthnicity`}
                        />
                        <InfoDisplayGroup
                            profileKey="datingReligion"
                            label={`Looking For`}
                            value={`${latestDatingInfo.datingReligion.map((i) => `${i}`)}`}
                            visibleUpdate={updateDataByPath}
                            visibilityData={latestDatingInfo.visible}
                            stepName={`datingReligion`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutDescriptionInformation;
