import { FC, lazy, Suspense } from "react";
import { Redirect, Route } from "react-router";
import { settingNFTRoute, settingProfileRoute, settingRoute, settingWalletRoute } from "../../commons/route";
import DefaultLayout from "../../components/Layout";
import SettingLayout from "./components/SettingLayout";

const ProfileSettings = lazy(() => import('./profile'))
const WalletSettings = lazy(() => import('./wallet'))
const NFTSettings = lazy(() => import('./nft'))

const SettingsRouter : FC = () => {
    return (
        <DefaultLayout>
            <SettingLayout>
                <Suspense fallback={<div>Loading...</div>} >
                    <Route exact path={settingRoute} >
                        <Redirect to={settingProfileRoute} />
                    </Route>
                    <Route exact path={settingProfileRoute}>
                        <ProfileSettings />
                    </Route>
                    <Route exact path={settingWalletRoute}>
                        <WalletSettings />
                    </Route>
                    <Route path={settingNFTRoute} >
                        <NFTSettings />
                    </Route>
                </Suspense>
            </SettingLayout>
        </DefaultLayout>
    )
};

export default SettingsRouter;