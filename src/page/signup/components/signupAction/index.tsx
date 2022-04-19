import { FC } from "react";


const SignupAction : FC = ({children}) => {

    return (
        <div className="rd-signup-action">
            <div>
                {children}
            </div>
        </div>
    )
};

export default SignupAction;