import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';
import { Suspense, lazy } from "react";
import { mainRoute, startRoute, profileRoute, settingRoute, passportRoute } from './commons/route'

const HomePage = lazy(() => import('./page/home'));
const StartMain = lazy(() => import('./page/start'));
const ViewProfileRoutePage = lazy(() => import('./page/p'));
const SettingsRouter = lazy(() => import('./page/settings'));
const PassportPage = lazy(() => import('./page/passport'));

export default function Router() {
    return (
        <BrowserRouter basename='/'>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path={mainRoute}>
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
                    <Route path={passportRoute}>
                        <PassportPage />
                    </Route>
                </Switch>
            </Suspense>
        </BrowserRouter>
    )
}
