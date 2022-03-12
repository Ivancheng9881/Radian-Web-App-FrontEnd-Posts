import { FC, useContext, useEffect, useState } from "react";
import Web3Context from "../../../../utils/web3/context/web3.context";
import { getMappedAddresses, getProfileErc } from "../../../../utils/web3/contract/profileContract/erc";
import LinkWalletContext from "./linkWallet.context";
import { NewWalletType, TargetProfileType } from "./linkWallet.interface";



const LinkWalletProvider : FC = ({children}) => {

    const objKey = { 
        metamask: 'metamask@erc',
        phantom: 'phantom@solana'
    } as const;

    const web3Context = useContext(Web3Context);

    // the profile to be linked
    const [ targetProfile, setTargetProfile ] = useState<TargetProfileType>({
        address: '',
        profileID: -1,
        provider: '',
        mappedAddresses: [],
        isFrozen: false,
    });
    // controller for steppers
    const [ newWallet, setNewWallet ] = useState<NewWalletType>({
        address: '6c8RNFQY38d1vmp2PVhPcEz6QWqPLjwaRDVKktWdxqiR',
        network: '',
    })
    const [ step, setStep ] = useState<number>(-1);


    useEffect(() => {
        if (web3Context.providers.selected) {
            getProfile();
        }
    }, [web3Context.providers]);

    const getProfile = async () => {
        let addr = web3Context.providers[web3Context.providers.selected];
        if (web3Context.providers.selected == objKey.metamask && !targetProfile.isFrozen) {
            let _p = await getProfileErc(addr);
            let addresses = await getMappedAddresses(_p.profileID)

            setTargetProfile({
                ...targetProfile,
                address: addr,
                profileID: _p.profileID,
                mappedAddresses: addresses,
                provider: web3Context.providers.selected,
                isFrozen: false,
            })
        }
    };

    return (
        <LinkWalletContext.Provider value={{
            targetProfile: targetProfile,
            setTargetProfile: setTargetProfile,
            objKey: objKey,
            step: step,
            setStep: setStep,
            newWallet: newWallet,
            setNewWallet: setNewWallet,
        }} >
            {children}
        </LinkWalletContext.Provider>
    )
};

export default LinkWalletProvider;