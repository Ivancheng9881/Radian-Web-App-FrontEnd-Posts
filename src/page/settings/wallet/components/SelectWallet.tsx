import { useWallet } from "@solana/wallet-adapter-react";
import { PhantomWalletName } from "@solana/wallet-adapter-wallets";
import { Button, Input, message, Select, Spin, Typography } from "antd";
import { FC, useContext, useEffect, useState } from "react";
import { FullProfile } from "../../../../schema/profile/profile.interface";
import Web3Context from "../../../../utils/web3/context/web3.context";
import { getPersonalProfile, getProfileFromAddress } from "../../../../utils/web3/contract/profileContract";
import { getProfileErc } from "../../../../utils/web3/contract/profileContract/erc";
import { truncateAddress } from "../../../../utils/web3/general/parser.utils";
import LinkWalletContext from "../context/linkWallet.context";
import { LinkWalletContextType } from "../context/linkWallet.interface";
import LinkProfileFormWrapper from "./wrapper.components";

const styles = {
    text: {
        textAlign: 'center'
    }
} as const;

const LinkProfileSelectWallet : FC = (props) => {

    const { newWallet, setNewWallet, targetProfile, setStep, step, objKey } : LinkWalletContextType = useContext(LinkWalletContext);
    const web3Context = useContext(Web3Context);
    const solanaWallet = useWallet();
    
    const [ refreshing, setRefreshing ] = useState(true);
    const [ invalidAddress, setInvalidAddress ] = useState<string>('');

    useEffect(() => {
        setRefreshing(true);
        if (web3Context.providers?.selected) {
            initNewWallet();
        }
    }, [web3Context.providers]);

    const initNewWallet = async () => {

        let _address = web3Context.providers[web3Context.providers.selected]
        let isValidAddr = await validateNewWallet();

        if (web3Context.providers?.selected == objKey.phantom) {
            _address = _address.toBase58()
        }
        
        if (isValidAddr) {
            setNewWallet({
                ...newWallet,
                address: _address
            });
        }
    }

    /**
     * validate user current address for validality of profile binding
     * address without profile binded is always ok
     * 
     * address with profile binded, but the same one currently working on /
     * should send notice to user that this address is already binded
     * 
     * address with different profile bind should be rejected
     * 
     * @param a walletAddress 
     * @returns 
     */
    const validateNewWallet = async (): Promise<boolean> => {
        let _network : string;
        let _address : any;

        try {
            let _p = await getPersonalProfile(web3Context);
            console.log(_p)
            setRefreshing(false);
            if (!_p) {
                setInvalidAddress('');
                return true;
            } else if (_p.profileID === targetProfile.profileID) {
                let msg = `This wallet has been binded to the current profile already`
                message.warning(msg);
                setInvalidAddress(msg);
                return false;
            } else {
                let msg = `This wallet has been binded to another profile already`
                message.warning(msg)
                setInvalidAddress(msg);
                return false;
            }
        } catch(err: any) {
            if (err.code == 4200) {
                setRefreshing(false);
                setInvalidAddress('');
            };
            return true;
        }
    }

    const handleClick = async () => {
        if (newWallet.network == 'phantom') {
            solanaWallet.select(PhantomWalletName)
            await solanaWallet.connect();
        }
        setStep(step+1);
    } 

    return (
        <LinkProfileFormWrapper >
            <Typography.Title level={3} style={styles.text}>We need to confirm your new address</Typography.Title>
            <Typography.Title level={4}>Open {newWallet.network} and change to the address you want to add.</Typography.Title>
            {
                invalidAddress 
                ? <Typography.Title level={4} >
                    <Typography.Text type="warning" >{invalidAddress}</Typography.Text>
                </Typography.Title>
                : <>
                    <Typography.Title level={4} style={styles.text}>
                        Is this the new address you want to add?<br/>
                        {truncateAddress(newWallet.address, 16)}
                    </Typography.Title>
                    <Spin spinning={refreshing}>
                        <Button 
                            onClick={handleClick}
                            type='primary'
                            shape="round"
                            size="large"
                            disabled={invalidAddress.length > 0}
                        >
                            {newWallet.address === targetProfile.address ? 'Remember to change the address' :'Confirm'}
                        </Button>
                    </Spin>
                </>
            }
        </LinkProfileFormWrapper>
    )
};

export default LinkProfileSelectWallet;