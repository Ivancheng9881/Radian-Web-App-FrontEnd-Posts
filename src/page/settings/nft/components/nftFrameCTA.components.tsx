import { CoffeeOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { FC } from "react";
import { StyleSheet } from "../../../../schema/helper.interface";


const NFTFrameCTA: FC = () => {

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
            textAlign: 'center',
            minHeight: `60px`,
        }
    }

    return (
        <div style={styles.wrapper}>
            <Card style={styles.card}>
                <div style={styles.body}>
                    <CoffeeOutlined style={styles.icon} />
                </div>
                <Card.Meta 
                    style={styles.meta}
                    title={`Create your NFT now`}
                    description={<span>&nbsp;</span>}
                />
            </Card>
        </div>
    )
};

export default NFTFrameCTA;