import { FC } from "react";
import SignupProvider from "../context/signup.provider";

const SignupLayout : FC = ({children}) => {
    return (
        <SignupProvider>
            <div className="rd-signup-layout-root">
                {children}
            </div>
        </SignupProvider>
    )
};

export default SignupLayout;