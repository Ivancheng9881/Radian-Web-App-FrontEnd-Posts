import {
    BrowserRouter,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';

import { mainRoute, startRoute, profileRoute, myProfileRoute } from './commons/route'
import HomePage from './page/home';
import StartMain from './page/start'
import ViewProfilePage from './page/view';


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
                    path={`${profileRoute}/:network/:pid`}
                    component={ViewProfilePage}
                />

                <Route
                    path={myProfileRoute}
                    component={ViewProfilePage}
                />
            </Switch>
        </BrowserRouter>
    )
}
