import { FC } from "react";
import config from "../../commons/config";
import SplashScreen from "../../components/SplashScreen/SplashScreen";

interface PageProps {
    logoOnly?: boolean
}

const SuspenseScreen : FC<PageProps> = ({logoOnly=false}) => {

    return (
        <div className="rd-flexbox rd-flexbox-vertical-center">
            <div className="rd-flexbox rd-flexbox-vertical" >
                {/* <img src={`${config.assets.cdn}/animation/loading_logo.gif`} />
                {!logoOnly && <img src={`${config.assets.cdn}/animation/loading_text.gif`} />} */}

                <SplashScreen />
            </div>
        </div>
    )
};

export default SuspenseScreen;