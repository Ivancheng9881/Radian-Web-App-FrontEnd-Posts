import { Route } from 'react-router-dom';

import { checkoutProfileRoute, createProfileRoute, startRoute } from '../../commons/route';
import CreateProfileProvider from './context/profile/profile.provider';
import DatingProvider from './context/datingApp/dating.provider';
import DefaultLayout from '../../components/Layout';
import ProfileProvider from './context/socialApp/profile.provider';
import { lazy, Suspense } from 'react';

const ChooseWalletPage = lazy(() => import('./root'))
const CreateProfilePage = lazy(() => import('./profile'))
const CreateProfileCheckout = lazy(() => import('./checkout'))

const HomeRouter = () => {
    return (
        <DefaultLayout fullWidth>
            <ProfileProvider>
                <DatingProvider>
                    <CreateProfileProvider>
                        <Suspense fallback={<div>Loading...</div>} >
                            <Route 
                                exact 
                                path={startRoute} 
                                component={<ChooseWalletPage />} 
                            />
                            <Route 
                                path={createProfileRoute} 
                                component={<CreateProfilePage />} 
                            />
                            <Route 
                                path={checkoutProfileRoute} 
                                component={<CreateProfileCheckout />} 
                            />
                        </Suspense>
                    </CreateProfileProvider>
                </DatingProvider>
            </ProfileProvider>
        </DefaultLayout>
    );
};

export default HomeRouter;
