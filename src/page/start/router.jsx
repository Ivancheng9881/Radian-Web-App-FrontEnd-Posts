import { Route } from 'react-router-dom';

import { checkoutProfileRoute, createProfileRoute, startRoute } from '../../commons/route';
import Layout from '../../components/Layout';
import ChooseWalletPage from './root';
import CreateProfilePage from './profile';
import CreateProfileCheckout from './checkout';
import CreateProfileProvider from './context/profile/profile.provider';
import DatingProvider from './context/datingApp/dating.provider';

const HomeRouter = () => {
    return (
        <Layout>
            <DatingProvider>
                <CreateProfileProvider>
                    <Route exact path={startRoute} component={ChooseWalletPage} />
                    <Route path={createProfileRoute} component={CreateProfilePage} />
                    <Route path={checkoutProfileRoute} component={CreateProfileCheckout} />
                </CreateProfileProvider>
            </DatingProvider>
        </Layout>
    );
};

export default HomeRouter;
