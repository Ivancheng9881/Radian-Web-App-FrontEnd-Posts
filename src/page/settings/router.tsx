import { FC } from "react";
import { Redirect, Route } from "react-router";
import { settingNFTRoute, settingProfileRoute, settingRoute, settingWalletRoute } from "../../commons/route";
import DefaultLayout from "../../components/Layout";
import SettingLayout from "./components/SettingLayout";
import NFTSettings from "./nft";
import ProfileSettings from "./profile";
import WalletSettings from "./wallet";

const SettingsRouter : FC = () => {
    return (
        <DefaultLayout>
            <SettingLayout>
                <Route exact path={settingRoute} >
                    <Redirect to={settingProfileRoute} />
                </Route>
                <Route exact path={settingProfileRoute} component={ProfileSettings} />
                <Route exact path={settingWalletRoute} component={WalletSettings} />
                <Route exact path={settingNFTRoute} component={NFTSettings} />
            </SettingLayout>
        </DefaultLayout>
    )
};

export default SettingsRouter;