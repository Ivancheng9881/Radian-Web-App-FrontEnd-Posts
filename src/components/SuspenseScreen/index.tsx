import { FC } from "react";
import SplashScreen from "../../components/SplashScreen/SplashScreen";

interface PageProps {
    logoOnly?: boolean
}

const SuspenseScreen : FC<PageProps> = ({logoOnly=false}) => {

    return (
        <div className="rd-flexbox rd-flexbox-vertical-center">
            <div className="rd-flexbox rd-flexbox-vertical" >
                <div className="rd-splash-root">
                    <div className="rd-splash-inner">
                        <SplashScreen />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SuspenseScreen;