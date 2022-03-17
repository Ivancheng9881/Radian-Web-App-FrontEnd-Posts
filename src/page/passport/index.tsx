import Layout from "antd/lib/layout/layout";
import { FC, useContext } from "react";
import DefaultLayout from "../../components/Layout";
import RadianPassport from "../../components/Passport";
import UserContext from "../../utils/user/context/user.context";
import Web3Context from "../../utils/web3/context/web3.context";


const PassportPage : FC = () => {

    const userContext = useContext(UserContext);
    const web3Context = useContext(Web3Context);
    
    const profile = userContext.profile

    return (
        <DefaultLayout>
            <RadianPassport profile={profile} />
        </DefaultLayout>
    )
};

export default PassportPage;