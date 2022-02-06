import { useContext } from 'react';
import CreateProfileContext from '../context/profile/profile.context';
import CheckoutCreateProfile from './components/CreateProfile';
import CheckoutDescriptionInformation from './components/DescriptionInformation';
import CheckoutIdentityInformation from './components/IdentityInformation';
import CheckoutNFTInformation from './components/NFTInformation';
import CheckoutWrapper from './components/Wrapper';

const CreateProfileCheckoutController = () => {
    const { checkoutStep, checkoutStepList, scrollDirection } = useContext(CreateProfileContext);

    return (
        <div>
            <CheckoutWrapper>
                {checkoutStepList[checkoutStep].id === 'identityInformation' && <CheckoutIdentityInformation />}
                {checkoutStepList[checkoutStep].id === 'descriptionInformation' && <CheckoutDescriptionInformation />}
                {/* {checkoutStepList[checkoutStep].id === 'nft' && <CheckoutNFTInformation />} */}
                {checkoutStepList[checkoutStep].id === 'profileCreated' && <CheckoutCreateProfile />}
            </CheckoutWrapper>
        </div>
    );
};

export default CreateProfileCheckoutController;
