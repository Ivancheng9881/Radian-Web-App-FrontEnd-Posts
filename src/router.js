import {
    BrowserRouter,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';

import { mainRoute, startRoute } from './commons/route'
import HomePage from './page/home';
import StartMain from './page/start'


export default function Router() {
    return (
        <BrowserRouter basename=''>
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
            </Switch>
        </BrowserRouter>
    )
}
