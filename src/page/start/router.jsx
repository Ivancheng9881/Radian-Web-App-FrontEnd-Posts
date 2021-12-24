import { Route } from "react-router-dom"

import { createProfileRoute, startRoute } from "../../commons/route"
import Layout from "../../components/Layout";
import ChooseWalletPage from "./root";
import CreateProfilePage from "./profile";


const HomeRouter = () => {

    return (
        <Layout>
            <Route 
                exact
                path={startRoute}
                component={ChooseWalletPage}
            />
            <Route 
                path={createProfileRoute}
                component={CreateProfilePage}
            />
        </Layout>
    )
};

export default HomeRouter;