import { FC, useState } from "react";
import SuspenseScreen from "../../components/SuspenseScreen";
import SplashScreenContext from "./Splash.context";
import SplashScreen from "../../components/SplashScreen/SplashScreen";


const SplashScreenProvider : FC = ({children}) => {

    const [ isLoading, setIsLoading ] = useState<boolean>(false)

    return (
        <SplashScreenContext.Provider value={{isLoading, setIsLoading}}>
            {
            isLoading && <div className="rd-splash-root">
                <div className="rd-splash-inner">
                    <SuspenseScreen />
                </div>
            </div>
            }

            {children}
        </SplashScreenContext.Provider>
    )
};

export default SplashScreenProvider;