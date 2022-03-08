import { FC, useContext, useState } from "react";
import { Button, Col, Divider, Input, Row, Space, Typography } from "antd";
import LinkProfileSendRequest from "./components/SendRequest";
import LinkProfileHeader from "./components/headers";
import LinkWalletContext from "./context/linkWallet.context";
import { LinkWalletContextType } from "./context/linkWallet.interface";
import LinkProfileStepper from "./components/stepper";
import LinkProfileSelectProvider from "./components/SelectProvider";
import LinkProfileSelectWallet from "./components/SelectWallet";
import LinkProfileAcceptRequest from "./components/AcceptRequest";

const styles = {
    root: {
        padding: 5,
    },
    body: {
        width: '100%',
        maxWidth: 800,
        paddingTop: 15
    },
    button: {
        textAlign: 'center',
    },
    row: {
        marginBottom: 16,
    }
} as const;

const LinkProfileBody: FC = () => {

    const { targetProfile, setTargetProfile, setStep, step }: LinkWalletContextType = useContext(LinkWalletContext);

    const freezeTargetProfile = () => {
        setTargetProfile({
            ...targetProfile,
            isFrozen: true,
        });
        setStep(0);
    }

    return (
        <div style={styles.root}>
            <Space direction="vertical" style={styles.body} size='large'>
                <LinkProfileHeader />
                <Divider />
                {!targetProfile.isFrozen && <div style={styles.button}>
                    <Button 
                        type="primary"
                        shape="round"
                        size='large'
                        onClick={freezeTargetProfile}
                    >
                        Connect Now
                    </Button>
                </div>}
                { targetProfile.isFrozen && <LinkProfileStepper />}
                { step == 0 && <LinkProfileSelectProvider /> }
                { step == 1 && <LinkProfileSelectWallet /> }
                { step == 2 && <LinkProfileSendRequest /> }
                { step == 3 && <LinkProfileAcceptRequest />}
            </Space>
        </div>
    )
};

export default LinkProfileBody;