import { useWallet } from "@solana/wallet-adapter-react";
import { Button, Col, Input, message, Row, Space, Spin, Typography } from "antd";
import React, { FC, useContext, useEffect, useState } from "react";
import { addAddressToProfile, addProfileMapping, getProfileErc } from "../../../../utils/web3/contract/profileContract/erc";
import { createProfileMapping } from "../../../../utils/web3/contract/profileContract/solana";
import { truncateAddress } from "../../../../utils/web3/general/parser.utils";
import LinkWalletContext from "../context/linkWallet.context";
import { LinkWalletContextType } from "../context/linkWallet.interface";
import LinkProfileFormWrapper from "./wrapper.components";


const styles = {
    input: {
        width: 350
    },
} as const;

const LinkProfileRequest: FC = () => {

    const linkWalletContext: LinkWalletContextType = useContext(LinkWalletContext);
    const solanaWallet = useWallet();
    
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    useEffect(() => {   
        if (linkWalletContext.newWallet.network == 'phantom') {
            console.log('phantom')
            connectSolWallet();
        }
    }, []);

    useEffect(() => {
        console.log(solanaWallet.connected)
        // if (!solanaWallet.connected)
    }, [solanaWallet.connected])

    const connectSolWallet = async () => await solanaWallet.connect();

    const handleRequestCheckout = () => {
        setIsLoading(false);
        linkWalletContext.setStep(linkWalletContext.step + 1);
    }

    const handleRequestCreate = async () => {
        // setIsLoading(true) 
        if (linkWalletContext.newWallet.network == 'phantom') {
            await handleRequetCreateSOL();
        } else if (linkWalletContext.newWallet.network == 'metamask') {
            await handleRequestCreateERC();
        }
        // setIsLoading(true);
        // try {
        //     const txn = await addProfileMapping(linkWalletContext.targetProfile.profileID);
        //     const isSuccess = await txn.wait();
        //     if (isSuccess) handleRequestCheckout();     

        // } catch (err) {
        //     console.log(err)
        //     setIsLoading(false)
        // }
    };

    const handleRequetCreateSOL = async () => {
        try {
            let txSig = await createProfileMapping(solanaWallet);
            console.log(txSig)
            if (txSig) handleRequestCheckout();
    
        } catch(err: any) {
            console.log(err);
            message.warning = err.message
        }
    }

    const handleRequestCreateERC = async () => {
        try {
            const txn = await addProfileMapping(linkWalletContext.targetProfile.profileID);
            const isSuccess = await txn.wait();
            if (isSuccess) handleRequestCheckout();     
        } catch (err) {
            console.log(err)
            setIsLoading(false)
        }
    }

    return (
        <LinkProfileFormWrapper>
                <Typography.Title level={3}>Send Link Request</Typography.Title>
                <div>
                    <Typography.Title level={4} >You are sending link request from the following address: </Typography.Title>
                    <Row gutter={12} >
                        <Col span={6} >
                            <Typography.Title level={4}>Network</Typography.Title>
                        </Col>
                        <Col span={18} >
                            <Typography.Title level={4} >{linkWalletContext.newWallet.network}</Typography.Title>
                        </Col>
                    </Row>
                    <Row gutter={12} >
                        <Col span={6} >
                            <Typography.Title level={4}>Address</Typography.Title>
                        </Col>
                        <Col span={18} >
                            <Typography.Title level={4}>{truncateAddress(linkWalletContext.newWallet.address, 16)}</Typography.Title>
                        </Col>
                    </Row>
                </div>
                <Spin spinning={isLoading}>
                    <Button  
                        type='primary'
                        shape="round"
                        size="large"
                        onClick={handleRequestCreate}
                    >
                        Send Request
                    </Button>
                </Spin>
        </LinkProfileFormWrapper>
    )
};

export default LinkProfileRequest;