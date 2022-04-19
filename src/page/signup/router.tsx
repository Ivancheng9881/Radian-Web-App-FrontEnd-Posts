import { FC, lazy, Suspense } from 'react';
import { Route } from 'react-router';
import { signupInfoRoute, signupPropicRoute } from '../../commons/route';
import DefaultLayout from "../../components/Layout";
import SuspenseScreen from '../../components/SuspenseScreen';
import SignupLayout from './Layout';

const SignupInfoPage = lazy(() => import('./info'));
const SignupProfilePicturePage = lazy(() => import('./profilePicture'));

const SignupRouter : FC = () => {
    
    return (
        <DefaultLayout>
            <SignupLayout>
                <Suspense fallback={<SuspenseScreen />} >
                    <Route path={signupInfoRoute}>
                        <SignupInfoPage />
                    </Route>
                    <Route path={signupPropicRoute}>
                        <SignupProfilePicturePage />
                    </Route>
                </Suspense>
            </SignupLayout>
        </DefaultLayout>
    )
};

export default SignupRouter;