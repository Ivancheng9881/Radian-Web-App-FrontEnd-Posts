import { FC } from 'react';
import { Route } from 'react-router';
import { 
    SIGNUP_INFO_ROUTE, 
    SIGNUP_NFT_ROUTE, 
    SIGNUP_PROPIC_ROUTE, 
    SIGNUP_SUMMARY_ROUTE, 
    SIGNUP_TOKEN_ROUTE
} from '../../commons/route';
import DefaultLayout from "../../components/Layout";
import SignupInfoPage from './info';
import SignupNftPage from './nft';
import SignupLayout from './Layout';
import SignupProfilePicturePage from './profilePicture';
import { SignupLocationState } from "./router.d";
import SignupTokenPage from './token';
import SignupSummaryPage from './summary';

const SIGNUP_ROUTER : FC = () => {
    
    return (
        <DefaultLayout>
            <SignupLayout>
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
            </SignupLayout>
        </DefaultLayout>
    )
};

export type { SignupLocationState }
export default SIGNUP_ROUTER;