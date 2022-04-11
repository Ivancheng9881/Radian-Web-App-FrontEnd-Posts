import { FC } from "react";
import LandingStep from "./components/Steps.compoents";
import DefaultLayout from "../../components/Layout";
import { Layout } from "antd";

import './styles/index.less';

interface PageProps {

}

const LangingPage : FC<PageProps> = () => {

    return (
        <DefaultLayout>
            <Layout.Content>
                <LandingStep />
            </Layout.Content>
        </DefaultLayout>
    )
};

export default LangingPage;