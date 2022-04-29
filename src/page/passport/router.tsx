import { FC } from "react";
import { Route } from "react-router";
import { PASSPORT_ROUTE, PASSPORT_ME_ROUTE, PASSPORT_USER_ROUTE } from "../../commons/route";
import DefaultLayout from "../../components/Layout";
import PassportOverviePage from "./main";
import PassportMePage from "./me";
import PassportUserPage from "./u";


const PassportRouter : FC = () => {

    return (
        <DefaultLayout  >
            <Route exact path={PASSPORT_ROUTE}  >
                <PassportOverviePage />
            </Route>
            <Route exact path={PASSPORT_ME_ROUTE} >
                <PassportMePage />
            </Route>
            <Route exact path={PASSPORT_USER_ROUTE} >
                <PassportUserPage />
            </Route>
        </DefaultLayout>
    )
};

export default PassportRouter;