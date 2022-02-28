import { Space, Spin } from "antd";
import { FC } from "react";


const LoadingScreen : FC = (props) => {

    const styles : any = {
        width: '100%', 
        textAlign: 'center'
    };

    return (
        <Space 
            direction="vertical"
            style={styles}>
            <Spin size="large" />
        </Space>
        
    )
};

export default LoadingScreen;