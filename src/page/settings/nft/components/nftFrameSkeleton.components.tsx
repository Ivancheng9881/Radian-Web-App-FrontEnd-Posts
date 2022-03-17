import { Card, Skeleton, Spin } from "antd";
import { FC } from "react";
import { StyleSheet } from "../../../../schema/helper.interface";


const NFTFrameSkeleton: FC = () => {

    const styles: StyleSheet = {
        wrapper: {
            padding: `10px`
        },
        card: {
            width: `240px`,
        },
        body: {
            height: `240px`,
            width: `auto`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        icon: {
            fontSize: `3rem`
        },
        meta: {
            textAlign: `center`,
            minHeight: `60px`,
        },
    }

    return (
        <div style={styles.wrapper}>
            <Card style={styles.card}>
                <div style={styles.body}>
                    <Spin />
                </div>
                <Card.Meta 
                    style={styles.meta}
                    title={<Skeleton active title={false} paragraph={{rows: 1}} />}
                />
            </Card>
        </div>

    )
};

export default NFTFrameSkeleton;