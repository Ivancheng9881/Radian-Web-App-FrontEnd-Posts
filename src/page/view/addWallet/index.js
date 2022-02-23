import Typography from '../../../components/Typography';
import TextField from '../../../components/Textfield';
import { useContext, useEffect, useState} from 'react';
import ProfileContext from '../../../utils/profile/context/profile.context';
import Web3Context from '../../../utils/web3/context/web3.context';
import RoundedButton from '../../../components/Button/Rounded.components';
import DoubleCollumTextfield from '../../../components/DoubleCollumTextfield';

export default function AddWalletPage(props) {
    
    const { getLatestField, updatedData, updateDataByKey } = useContext(ProfileContext);
    const {  providers } = useContext(Web3Context);
    let [ selected, setSelected ] = useState(null);
    let [ selectedWallet, setSelectedWallet ] = useState(null);
    let [ reveal, setReveal ] = useState(false);

    // get provider
    useEffect(()=>{
        let wallet = providers.selected?.split("@")[1];
        if (wallet === "erc") {
            wallet = "ERC"
            setSelected(wallet);
            setSelectedWallet(providers[providers.selected]);
        };
        if (wallet === "solana") {
            wallet = "Solana"
            setSelected(wallet);
            setSelectedWallet(providers[providers.selected].toBase58());
        };
        
    }, [providers]);

    const toggleReveal = () => {setReveal((prevState)=>{!prevState})};

    return (
        <div className="pt-64 pb-72 px-10 w-full overflow-hidden bg-theme-bg-dark scroll">
            {/*  Select-none disable text selection, else will get randomly highlighted text */}
            <div className="m-auto w-3/5 select-none">
                <div className='w-full overflow-hidden break-words '>
                    <Typography.Featured alignment="left">Wallet Setting</Typography.Featured>
                    <div className="pt-4 pb-2">
                        <Typography.H2 alignment="left">{selected ? "You have Connected To" : "Please Connect Wallet"}</Typography.H2>
                    </div>
                </div>

                { selected &&
                <div className="mt-10">

                    <DoubleCollumTextfield title={"Chain"} content={"Address"}/>
                    <DoubleCollumTextfield title={selected} content={selectedWallet}/>

                    <div className="text-theme-white text-2xl pt-10">
                        <div className="relative inline-flex align-center w-auto pb-2">
                            <RoundedButton
                                onClick={toggleReveal}>
                                Add Wallet
                            </RoundedButton>
                        </div>
                    </div>

                    { reveal &&
                        <DoubleCollumTextfield title={"Chain"} content={"Address"}/>
                    }
                </div>}
            </div>
        </div>
    );
}