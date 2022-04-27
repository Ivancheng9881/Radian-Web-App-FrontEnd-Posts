import { FC } from "react";
import { Redirect, Route } from "react-router";
import { PASSPORT_ROUTE, PASSPORT_ME_ROUTE } from "../../commons/route";
import DefaultLayout from "../../components/Layout";
import PassportOverviePage from "./main";
import PassportMePage from "./me";


const PassportRouter : FC = () => {

    return (
        <DefaultLayout  >
            <Route exact path={PASSPORT_ROUTE}  >
                <PassportOverviePage />
            </Route>
            <Route exact path={PASSPORT_ME_ROUTE} >
                <PassportMePage />
            </Route>
        </DefaultLayout>
    )
};

export default PassportRouter;