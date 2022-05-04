import { FC, useState } from "react";
import SuspenseScreen from "../../components/SuspenseScreen";
import SplashScreenContext from "./Splash.context";


const SplashScreenProvider : FC = ({children}) => {

    const [ isLoading, setIsLoading ] = useState<boolean>(false)

    return (
        <SplashScreenContext.Provider value={{isLoading, setIsLoading}}>
            { isLoading && <SuspenseScreen /> }
            {children}
        </SplashScreenContext.Provider>
    )
};

export default SplashScreenProvider;