import { FC, useState, useContext, useEffect } from "react";
import { Button, Modal, Steps } from "antd";
import { CreateProfilePopupPropsType } from ".";
import { useWallet } from "@solana/wallet-adapter-react";
import { 
    createOrUpdateProfileSolana,
    createProfileMappingSolana, 
    getProfileMappingSolana
 } from "../../utils/web3/contract/profileContract/solana";
import { PhantomWalletAdapter, PhantomWalletName } from "@solana/wallet-adapter-wallets";

const CreateProfilePopupBodySolana : FC<CreateProfilePopupPropsType> = (props) => {
    
    const connectWalletStep = 0;
    const createProfileIDStep = 1;
    const createProfileStep = 2;

    const solanaWallet = useWallet();
    const [ step, setStep ] = useState(connectWalletStep);
    const [ profileMapping, setProfileMapping ] = useState(null);

    useEffect(
        () => {
            console.log('solanaWallet:', solanaWallet);
            if (solanaWallet.connected) {
                setStep(createProfileIDStep);
                solFetchProfileMapping();
            }
        },
        [ solanaWallet.connected ]
    );

    const solFetchProfileMapping = async () => {
        
        try {
            const _pm: any = await getProfileMappingSolana(solanaWallet);
            console.log(_pm)
            if (_pm.profileId) {
                setStep(createProfileStep);
                setProfileMapping(_pm)
            }
            return _pm
        } catch (err) {
            console.log(err)
        }
    } 

    const solConnectPhantom = async () => {
        try {
            if (solanaWallet.wallet!) {
                solanaWallet.select(PhantomWalletName)
            }
            await solanaWallet.connect();
        } catch (err) {
            console.log(err);
        }
    };

    const solCreateProfileMapping = async () => {
        try {
            let txn = await createProfileMappingSolana(solanaWallet);
            console.log(txn)
            if (txn) {
                let _pm = await solFetchProfileMapping();
            }
        } catch(err) {
            console.log(err)
        }
    }

    const solCreateProfile = async () => {
        try {
            let txn = await createOrUpdateProfileSolana(
                solanaWallet, 
                profileMapping.profileId, 
                props.cid.toString()
            );
            console.log(txn);
            if (txn) {
                props.setOpen(false);
            }

        } catch(err) {
            console.log(err);
        }
    }

    return (
        <Steps direction="vertical" current={step} >
        <Steps.Step
            title='Connect Phantom Wallet'
            description={
                <Button 
                    size='large' 
                    type='primary' 
                    onClick={solConnectPhantom}
                    disabled={step != connectWalletStep}
                    >
                    Connect
                </Button>
            }
        />
        <Steps.Step
            title='Create Profile ID'
            description={
                <Button 
                    size='large' 
                    type='primary' 
                    onClick={solCreateProfileMapping}
                    disabled={step != createProfileIDStep}
                >
                    Create Profile
                </Button>
            }
        />
        <Steps.Step
            title='Create Profile'
            description={
                <Button 
                    size='large' 
                    type='primary' 
                    onClick={solCreateProfile}
                    disabled={step != createProfileStep}
                >
                    Upload Profile
                </Button>
            }
        />
    </Steps>
    )
};

export default CreateProfilePopupBodySolana;