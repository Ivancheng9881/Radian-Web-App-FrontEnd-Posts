import { Layout } from "antd";
import { FC } from "react";
import config from "../../commons/config";


const CustomSider : FC = (props) => {

    const styles : any = {
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: config.antd.layout.headerHeight,
        bottom: 0,
      }

    return (
        <Layout.Sider 
            width={config.antd.layout.siderWidth} 
            style={styles}
        >
            {props.children}
        </Layout.Sider>
    )
};

export default CustomSider;