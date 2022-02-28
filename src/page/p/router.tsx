import { Route } from 'react-router-dom';

import { profileRoute, addAddressRoute } from '../../commons/route';
import Layout from '../../components/Layout';
import ViewProfilePage from './viewProfile';
import AddWalletPage from './addWallet';
import { FC } from 'react';

const ViewRouter: FC = () => {
    return (
        <Layout>
            <Route exact path={profileRoute} component={ViewProfilePage} />
            <Route path={`${profileRoute}/:network/:pid`} component={ViewProfilePage} />
            <Route exact path={addAddressRoute} component={AddWalletPage} />
        </Layout>
    );
};

export default ViewRouter;
