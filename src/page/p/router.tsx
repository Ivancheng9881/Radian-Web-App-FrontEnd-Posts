import { Route } from 'react-router-dom';

import { profileRoute, addAddressRoute } from '../../commons/route';
import DefaultLayout from '../../components/Layout';
import ViewProfilePage from './viewProfile';
import AddWalletPage from './addWallet';
import { FC } from 'react';

const ViewRouter: FC = () => {
    return (
        <DefaultLayout>
            <Route exact path={profileRoute} component={ViewProfilePage} />
            <Route path={`${profileRoute}/:network/:pid`} component={ViewProfilePage} />
            <Route exact path={addAddressRoute} component={AddWalletPage} />
        </DefaultLayout>
    );
};

export default ViewRouter;
