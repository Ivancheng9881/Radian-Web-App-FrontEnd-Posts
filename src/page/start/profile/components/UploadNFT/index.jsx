import Typography from '../../../../../components/Typography';
import { useContext, useEffect, useState } from 'react';
import RoundedButton from '../../../../../components/Button/Rounded.components';

const ProfileNFT = (props) => {
    // const { getLatestField, updateProfile, updatedProfile, updateProfileByKey } = useContext(ProfileContext);
    // let nftList = getLatestField('nft');

    return (
        <div id="RD-CreateProfile-name" className="RD-CreateProfileComponents">
            <Typography.Featured alignment="left">Your assets</Typography.Featured>
            <div className="pt-4 pb-2">
                <Typography.H2 alignment="left">Show off your NFTs:</Typography.H2>
            </div>

            <div className="mt-10 inline-flex">
                    <RoundedButton disabled={true} >
                        Coming Soon
                    </RoundedButton>
            </div>
        </div>
    );
};

export default ProfileNFT;
