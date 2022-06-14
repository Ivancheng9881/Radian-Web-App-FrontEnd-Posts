import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';
import { Suspense, lazy } from "react";
import { mainRoute, SIGNUP_ROUTE, startRoute, profileRoute, settingRoute, homeRoute, PASSPORT_ROUTE, postsRoute, groupsRoute } from './commons/route'
import SuspenseScreen from './components/SuspenseScreen';

const HomePage = lazy(() => import('./page/home'));
const StartMain = lazy(() => import('./page/start'));
const ViewProfileRoutePage = lazy(() => import('./page/p'));
const SettingsRouter = lazy(() => import('./page/settings'));
const PassportRouter = lazy(() => import('./page/passport/router'));
const LandingPage = lazy(() => import('./page/landing'));
const SignupPage = lazy(() => import('./page/signup/router'))
const PostsPage = lazy(() => import('./page/posts'));
const GroupsPage = lazy(() => import('./page/groups'));


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
                    <Route path={PASSPORT_ROUTE}>
                        <PassportRouter />
                    </Route>
                    <Route path={postsRoute}>
                        <PostsPage />
                    </Route>
                    <Route path={groupsRoute}>
                        <GroupsPage />
                    </Route>
                </Switch>
            </Suspense>
        </BrowserRouter>
    )
}
