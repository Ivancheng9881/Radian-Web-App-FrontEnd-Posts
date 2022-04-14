import { FC, lazy, Suspense } from 'react';
import { Route } from 'react-router';
import { signupInfoRoute } from '../../commons/route';
import DefaultLayout from "../../components/Layout";
import SuspenseScreen from '../../components/SuspenseScreen';
import SignupLayout from './Layout';

const SignupInfoPage = lazy(() => import('./info'));

const SignupRouter : FC = () => {
    
    return (
        <DefaultLayout>
            <SignupLayout>
                <Suspense fallback={<SuspenseScreen />} >
                    <Route path={signupInfoRoute}>
                        <SignupInfoPage />
                    </Route>
                </Suspense>
            </SignupLayout>
        </DefaultLayout>
    )
};

export default SignupRouter;