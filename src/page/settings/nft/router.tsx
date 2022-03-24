import { FC } from "react";
import { Route } from "react-router";
import { 
    settingNFTEthRoute, 
    settingNFTPolygonRoute,
    settingNFTRoute,
    settingNFTSolanaRoute
} from "../../../commons/route";
import NFTETHSettings from "./eth";
import NFTPolygonSettings from "./polygon";
import NFTSolanaSettings from "./solana";

const NFTSettingRouter : FC = () => {
    return (
        <>
            <Route exact path={settingNFTEthRoute} component={NFTETHSettings} />
            <Route exact path={settingNFTPolygonRoute} component={NFTPolygonSettings} />
            <Route exact path={settingNFTSolanaRoute} component={NFTSolanaSettings} />
        </>
    )
};

export default NFTSettingRouter;