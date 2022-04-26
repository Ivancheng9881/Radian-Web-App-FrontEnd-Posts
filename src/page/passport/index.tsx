import { Layout } from "antd";
import { FC, useContext } from "react";
import DefaultLayout from "../../components/Layout";
import RadianPassport from "../../components/Passport";
import UserContext from "../../utils/user/context/user.context";
import Web3Context from "../../utils/web3/context/web3.context";
import LandingSection from "../landing/components/Section.components";


const PassportPage : FC = () => {

    const userContext = useContext(UserContext);
    
    return (
        <DefaultLayout>
            <Layout.Content>
            <LandingSection >
            <div style={{marginTop: 80}}>
                    <RadianPassport profile={userContext.profile} />
                </div>
            </LandingSection>



            </Layout.Content>
        </DefaultLayout>
    )
};

export default PassportPage;