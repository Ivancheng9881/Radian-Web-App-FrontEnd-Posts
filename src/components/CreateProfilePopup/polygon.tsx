import { FC, useState, useContext, useEffect } from "react";
import { Button, Modal, Spin, Steps } from "antd";
import { CreateProfilePopupPropsType } from ".";
import { useWallet } from "@solana/wallet-adapter-react";
import { 
    createProfileMappingSolana, 
    getProfileMappingSolana
 } from "../../utils/web3/contract/profileContract/solana";
import Web3Context from "../../utils/web3/context/web3.context";
import { createProfileErc, getProfileErc } from "../../utils/web3/contract/profileContract/erc";
import ERCUtils from "../../utils/web3/context/erc.utils";
import LoadingScreen from "../LoadingScreen";


const CreateProfilePopupPolygon : FC<CreateProfilePopupPropsType> = (props) => {

    const connectWalletStep = 0;
    const createProfileStep = 1;
    const completeStep = 2;
    
    const web3Context = useContext(Web3Context);
    const [ step, setStep ] = useState(connectWalletStep);
    const [ existingProfile, setExistingProfile ] = useState<any>(null);
    const [ loading, setLoading ] = useState<boolean>(false);

    useEffect(() => {
        connectWallet();
    }, []);

    const connectWallet = async () => {
        try {
            const addr = await await web3Context.connect('erc');
            if (addr.length > 0) {
                // await getExistingProfile(addr[0]);
                setStep(createProfileStep)
            }
        } catch(err) {
            console.log(err)
        }
    };

    /**
     * no need to check if there is existing profile
     * the ERC util will handle this later
     */
    const createProfile = async () => {
        try {
            const txn = await createProfileErc(props.cid.toString(), false);
            if (txn) {
                setLoading(true);
                const isSuccess = await txn.wait();
                if (isSuccess) handleCheckoutComplete()
            }
        } catch(err) {
            console.log(err)
        }
    };

    const handleCheckoutComplete = () => {
        setLoading(false);
        setStep(completeStep);
    }

    return (
        <Steps direction="vertical" current={step} >
        <Steps.Step
            title='Connect Phantom Wallet'
            description={
                <Button 
                    size='large' 
                    type='primary' 
                    onClick={connectWallet}
                    disabled={step != connectWalletStep}
                    >
                    Connect
                </Button>
            }
        />
        <Steps.Step
            title='Create Profile'
            description={
                    loading
                    ? <Spin size="large" style={{marginLeft: '1rem'}} />
                    : <Button 
                        size='large' 
                        type='primary' 
                        onClick={createProfile}
                        disabled={step != createProfileStep}
                    >
                            Create Profile
                    </Button>
                
            }
        />
        <Steps.Step
            title='Profile Created'
        />
    </Steps>
    )
};

export default CreateProfilePopupPolygon