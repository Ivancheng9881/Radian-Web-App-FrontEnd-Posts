import {
    BrowserRouter,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';

import { mainRoute, startRoute } from './commons/route'
import HomeMain from './page/start'


export default function Router() {
    return (
        <BrowserRouter basename=''>
            <Switch>
                <Route 
                    exact
                    path={mainRoute}
                >
                    <Redirect to={startRoute} />
                </Route>
                <Route
                    path={startRoute}
                    component={HomeMain}
                />
            </Switch>
        </BrowserRouter>
    )
}
