import { Route } from 'react-router-dom';

import { checkoutProfileRoute, createProfileRoute, startRoute } from '../../commons/route';
import ChooseWalletPage from './root';
import CreateProfilePage from './profile';
import CreateProfileCheckout from './checkout';
import CreateProfileProvider from './context/profile/profile.provider';
import DatingProvider from './context/datingApp/dating.provider';
import DefaultLayout from '../../components/Layout';
import ProfileProvider from './context/socialApp/profile.provider';

const HomeRouter = () => {
    return (
        <DefaultLayout fullWidth>
            <ProfileProvider>
                <DatingProvider>
                    <CreateProfileProvider>
                        <Route 
                            exact 
                            path={startRoute} 
                            component={ChooseWalletPage} 
                        />
                        <Route 
                            path={createProfileRoute} 
                            component={CreateProfilePage} 
                        />
                        <Route 
                            path={checkoutProfileRoute} 
                            component={CreateProfileCheckout} 
                        />
                    </CreateProfileProvider>
                </DatingProvider>
            </ProfileProvider>
        </DefaultLayout>
    );
};

export default HomeRouter;
