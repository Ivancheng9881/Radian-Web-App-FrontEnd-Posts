import { Layout } from "antd";
import { FC } from "react";
import config from "../../commons/config";


const CustomContent : FC = (props) => {

    const styles = {
        marginLeft: config.antd.layout.siderWidth,
        width: `calc(100vw - ${config.antd.layout.siderWidth}px - 30px)`
    }

    return (
        <Layout.Content  style={styles}>
            {props.children}
        </Layout.Content>
    )
};

export default CustomContent;