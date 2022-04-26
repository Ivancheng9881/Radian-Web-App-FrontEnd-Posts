import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';
import { Suspense, lazy } from "react";
import { mainRoute, SIGNUP_ROUTE, startRoute, profileRoute, settingRoute, passportRoute, homeRoute } from './commons/route'
import SuspenseScreen from './components/SuspenseScreen';

const HomePage = lazy(() => import('./page/home'));
const StartMain = lazy(() => import('./page/start'));
const ViewProfileRoutePage = lazy(() => import('./page/p'));
const SettingsRouter = lazy(() => import('./page/settings'));
const PassportPage = lazy(() => import('./page/passport'));
const LandingPage = lazy(() => import('./page/landing'));
const SignupPage = lazy(() => import('./page/signup/router'))

export default function Router() {
    return (
        <BrowserRouter basename='/'>
            <Suspense fallback={<SuspenseScreen logoOnly />}>
                <Switch>
                    <Route exact path={mainRoute}>
                        <LandingPage />
                    </Route>
                    <Route path={SIGNUP_ROUTE}>
                        <SignupPage />
                    </Route>
                    {/* <Route exact path={homeRoute}>
                        <HomePage />
                    </Route>
                    <Route path={startRoute}>
                        <StartMain />
                    </Route>
                    <Route path={profileRoute} >
                        <ViewProfileRoutePage />
                    </Route>
                    <Route path={settingRoute}
                    >
                        <SettingsRouter />
                    </Route>
                     */}
                    <Route path={passportRoute}>
                        <PassportPage />
                    </Route>
                </Switch>
            </Suspense>
        </BrowserRouter>
    )
}
