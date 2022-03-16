import { FC, useState, useContext, useEffect } from "react";
import { Button, message, Modal, Spin, Steps } from "antd";
import { CreateProfilePopupPropsType } from ".";
import Web3Context from "../../utils/web3/context/web3.context";
import { createProfileErc, getProfileErc } from "../../utils/web3/contract/profileContract/erc";
import { useHistory } from "react-router";
import { mainRoute } from "../../commons/route";

const CreateProfilePopupPolygon : FC<CreateProfilePopupPropsType> = (props) => {

    const connectWalletStep = 0;
    const createProfileStep = 1;
    const completeStep = 2;
    
    const web3Context = useContext(Web3Context);
    const history = useHistory();

    const [ step, setStep ] = useState(connectWalletStep);
    const [ loading, setLoading ] = useState<boolean>(false);

    useEffect(() => {
        connectWallet();
    }, []);

    const connectWallet = async () => {
        try {
            const addr = await await web3Context.connect('erc');
            if (addr.length > 0) {
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
        setLoading(true)
        try {
            const txn = await createProfileErc(props.cid.toString(), props.gasless);
            if (txn) {
                // setLoading(true);
                const isSuccess = await txn.wait();
                if (isSuccess) handleCheckoutComplete()
            }
        } catch(err: any) {
            setLoading(false);
            console.log(err)
            message.warning(err.message);
        }
    };

    const handleCheckoutComplete = () => {
        setLoading(false);
        setStep(completeStep);
    };

    const handleBackToHome = () => {
        history.push(mainRoute);
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
                <Spin 
                    size="large" 
                    spinning={loading}
                    style={{marginLeft: '1rem'}} 
                >
                    <Button 
                        size='large' 
                        type='primary' 
                        onClick={createProfile}
                        disabled={step != createProfileStep}
                    >
                        Create Profile
                    </Button>
                </Spin>
            }
        />
        <Steps.Step
            title='Profile Created'
            description={<Button 
                    size='large' 
                    type='primary' 
                    onClick={handleBackToHome}
                    disabled={step != completeStep}
                >
                        Back To Home
                </Button>
        }
        />
    </Steps>
    )
};

export default CreateProfilePopupPolygon