import { Layout, Menu } from "antd";
import { FC } from "react";
import CustomContent from "../../../../components/Layout/CustomContent.components";
import CustomSider from "../../../../components/Layout/CustomSider.components";
import SettingMenu from "./SettingMenu.components";


const SettingLayout : FC = (props) => {
    return (
        <Layout>
            <CustomSider>
                <SettingMenu />
            </CustomSider>
            <CustomContent>
                {props.children}
            </CustomContent>
        </Layout>
    )
};

export default SettingLayout;