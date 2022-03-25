import { FC } from "react";
import { Route } from "react-router";
import { 
    settingNFTEthRoute, 
    settingNFTPolygonRoute,
    settingNFTSolanaRoute
} from "../../../commons/route";
import NFTETHSettings from "./eth";
import NFTPolygonSettings from "./polygon";
import NFTSolanaSettings from "./solana";

const NFTSettingRouter : FC = () => {
    return (
        <>
            <Route exact path={settingNFTEthRoute}>
                <NFTETHSettings />
            </Route>
            <Route exact path={settingNFTPolygonRoute}>
                <NFTPolygonSettings />
            </Route>
            <Route exact path={settingNFTSolanaRoute}>
                <NFTSolanaSettings />
            </Route>
        </>
    )
};

export default NFTSettingRouter;