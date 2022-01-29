import { Route } from 'react-router-dom';

import { checkoutProfileRoute, createProfileRoute, startRoute } from '../../commons/route';
import Layout from '../../components/Layout';
import ChooseWalletPage from './root';
import CreateProfilePage from './profile';
import CreateProfileCheckout from './checkout';
import CreateProfileProvider from './context/profile/profile.provider';

const HomeRouter = () => {
    return (
        <Layout>
            <CreateProfileProvider>
                <Route exact path={startRoute} component={ChooseWalletPage} />
                <Route path={createProfileRoute} component={CreateProfilePage} />
                <Route path={checkoutProfileRoute} component={CreateProfileCheckout} />
            </CreateProfileProvider>
        </Layout>
    );
};

export default HomeRouter;
