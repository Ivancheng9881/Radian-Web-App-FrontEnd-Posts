import { FC, lazy, Suspense } from 'react';
import { Route } from 'react-router';
import { 
    SIGNUP_INFO_ROUTE, 
    SIGNUP_NFT_ROUTE, 
    SIGNUP_PROPIC_ROUTE, 
    SIGNUP_SUMMARY_ROUTE, 
    SIGNUP_TOKEN_ROUTE
} from '../../commons/route';
import DefaultLayout from "../../components/Layout";
import SuspenseScreen from '../../components/SuspenseScreen';
import SignupLayout from './Layout';
import { SignupLocationState } from "./router.d";

const SignupInfoPage = lazy(() => import('./info'));
const SignupProfilePicturePage = lazy(() => import('./profilePicture'));
const SignupNftPage = lazy(() => import('./nft'));
const SignupTokenPage = lazy(() => import('./token'));
const SignupSummaryPage = lazy(() => import('./summary'));

const SIGNUP_ROUTER : FC = () => {
    
    return (
        <DefaultLayout>
            <SignupLayout>
                <Suspense fallback={<SuspenseScreen />} >
                    <Route path={SIGNUP_INFO_ROUTE}>
                        <SignupInfoPage />
                    </Route>
                    <Route path={SIGNUP_PROPIC_ROUTE}>
                        <SignupProfilePicturePage />
                    </Route>
                    <Route path={SIGNUP_NFT_ROUTE} >
                        <SignupNftPage />
                    </Route>
                    <Route path={SIGNUP_TOKEN_ROUTE} >
                        <SignupTokenPage />
                    </Route>
                    <Route path={SIGNUP_SUMMARY_ROUTE}>
                        <SignupSummaryPage />
                    </Route>
                </Suspense>
            </SignupLayout>
        </DefaultLayout>
    )
};

export type { SignupLocationState }
export default SIGNUP_ROUTER;