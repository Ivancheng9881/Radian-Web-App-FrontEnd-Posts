import { Typography, Spin, Button } from "antd";
import { FC, useState,  useContext, useEffect } from "react";
import LinkWalletContext from "../context/linkWallet.context";
import { LinkWalletContextType } from "../context/linkWallet.interface";
import LinkProfileFormWrapper from "./wrapper.components";
import { addAddressERC, addAddressToProfile } from "../../../../utils/web3/contract/profileContract/erc";
import Web3Context from "../../../../utils/web3/context/web3.context";


const LinkProfileAcceptRequest : FC = (props) => {

    const {
        step,
        setStep,
        newWallet,
        objKey,
        targetProfile,
    }: LinkWalletContextType = useContext(LinkWalletContext);
    const web3Context = useContext(Web3Context);

    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    useEffect(() => {
        handleWalletInit();
    }, [web3Context.providers, ])

    const handleWalletInit = async () => {
        if (web3Context.providers?.selected != targetProfile.provider) {
            setIsLoading(true);
            await web3Context.connect(targetProfile.provider.split('@')[1]);
        } else {
            setIsLoading(false);
        }
    }

    const handleRequestCheckout = () => {
        setIsLoading(false);
        setStep(step + 1);
    }

    const handleRequestAccept = async () => {
        // setIsLoading(true);
        console.log(targetProfile)
        if (targetProfile.provider == objKey.metamask) {
            await handleRequetAcceptERC();
        } else if (targetProfile.provider == objKey.phantom) {
            await handleRequetAcceptSOL();
        }
        // try {
        //     const txn = await addAddressToProfile(newWallet.address, false);
        //     const isSuccess = await txn.wait();
        //     if (isSuccess) handleRequestCheckout();
        // } catch (err) {
        //     console.log(err);
        //     setIsLoading(false);
        // }
    };

    const handleRequetAcceptERC = async () => {
        console.log(newWallet.network)
        const txn = await addAddressERC(newWallet.address, 'solana');
    };

    const handleRequetAcceptSOL = async () => {
        
    };

    return (
        <LinkProfileFormWrapper>
            <Typography.Title level={3}>Accept Link Request</Typography.Title>
            <Typography.Title level={4} >Now change back to the original address</Typography.Title>
            <Spin spinning={isLoading}>
                <Button  
                    type='primary'
                    shape="round"
                    size="large"
                    onClick={handleRequestAccept}
                    disabled={
                        targetProfile.provider != web3Context.providers?.selected
                        || targetProfile.address != web3Context.providers[web3Context.providers?.selected]
                    }
                >
                    Accept Request
                </Button>
            </Spin>

        </LinkProfileFormWrapper>
    )
};

export default LinkProfileAcceptRequest;