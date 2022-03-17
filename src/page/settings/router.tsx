import { FC } from "react";
import { Redirect, Route } from "react-router";
import { settingNFTEthRoute, settingNFTPolygonRoute, settingNFTRoute, settingNFTSolanaRoute, settingProfileRoute, settingRoute, settingWalletRoute } from "../../commons/route";
import DefaultLayout from "../../components/Layout";
import SettingLayout from "./components/SettingLayout";
import NFTSettings from "./nft";
import NFTETHSettings from "./nft/eth";
import NFTPolygonSettings from "./nft/polygon";
import NFTSolanaSettings from "./nft/solana";
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
                <Route exact path={settingNFTEthRoute} component={NFTETHSettings} />
                <Route exact path={settingNFTPolygonRoute} component={NFTPolygonSettings} />
                <Route exact path={settingNFTSolanaRoute} component={NFTSolanaSettings} />
            </SettingLayout>
        </DefaultLayout>
    )
};

export default SettingsRouter;