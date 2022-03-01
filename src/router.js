import {
    BrowserRouter,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';

import { mainRoute, startRoute, profileRoute, settingRoute } from './commons/route'
import HomePage from './page/home';
import StartMain from './page/start'
import ViewProfileRoutePage from './page/p';
import SettingsRouter from './page/settings';


export default function Router() {
    return (
        <BrowserRouter basename='/'>
            <Switch>
                <Route
                    exact
                    path={mainRoute}
                    component={HomePage}

                />
                <Route
                    path={startRoute}
                    component={StartMain}
                />
                <Route
                    path={profileRoute}
                    component={ViewProfileRoutePage}
                />
                <Route 
                    path={settingRoute}
                    component={SettingsRouter}
                />
            </Switch>
        </BrowserRouter>
    )
}
