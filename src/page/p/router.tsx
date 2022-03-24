import { Route } from 'react-router-dom';

import { profileRoute, addAddressRoute } from '../../commons/route';
import DefaultLayout from '../../components/Layout';
import { FC, lazy, Suspense } from 'react';

const ViewProfilePage = lazy(() => import('./viewProfile'))
const AddWalletPage = lazy(() => import('./addWallet'))

const ViewRouter: FC = () => {
    return (
        <DefaultLayout>
            <Suspense fallback={<div>Loading...</div>}>
                <Route exact path={profileRoute} component={ViewProfilePage} />
                <Route path={`${profileRoute}/:network/:pid`} component={ViewProfilePage} />
                <Route exact path={addAddressRoute} component={AddWalletPage} />  
            </Suspense>
        </DefaultLayout>
    );
};

export default ViewRouter;
