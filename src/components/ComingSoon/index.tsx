import { Typography } from "antd";
import { FC } from "react";

const styles = {
    textAlign: 'center',
    minHeight: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
} as const;

const ComingSoon : FC = () => {
    return (
        <div style={styles}>
            <Typography.Title level={1}>Coming Soon</Typography.Title>
        </div>
    )
}

export default ComingSoon;