import { Steps } from "antd";
import { FC, useContext } from "react";
import LinkWalletContext from "../context/linkWallet.context";
import { LinkWalletContextType } from "../context/linkWallet.interface";

const LinkProfileStepper : FC = () => {

    const { step, setStep } : LinkWalletContextType = useContext(LinkWalletContext);

    return (
        <Steps progressDot current={step} onChange={setStep} >
            <Steps.Step title='Select Provider' />
            <Steps.Step title='Select Wallet' />
            <Steps.Step title='Send Request' />
            <Steps.Step title='Accept Request' />
        </Steps>
    )
};

export default LinkProfileStepper;