import { Space } from "antd";
import { FC } from "react";

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'center',
    },
    space: {
        alignItems: 'center',
    }
} as const;

const LinkProfileFormWrapper : FC = ({children}) => {

    return (
        <div style={styles.root}>
            <Space direction="vertical" style={styles.space} size='large'>
                {children}
            </Space>
        </div>
    )
};

export default LinkProfileFormWrapper;