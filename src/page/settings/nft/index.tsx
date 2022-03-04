import { FC } from "react";
import { Button, Col, Input, Row, Space } from "antd";
import ComingSoon from "../../../components/ComingSoon";

const styles = {
    root: {
        padding: 5,
    },
    body: {
        width: '100%',
        maxWidth: 800,
    },
    row: {
        marginBottom: 16,
    }
} as const;

const NFTSettings: FC = () => {
    return (
        <div style={styles.root}>
            <Space direction="vertical" style={styles.body}>
                <ComingSoon />
            </Space>
        </div>
    )
};

export default NFTSettings;