import Typography from '../../../components/Typography';
import TextField from '../../../components/Textfield';
import { useContext, useEffect, useState} from 'react';
import ProfileContext from '../../start/context/socialApp/profile.context';
import Web3Context from '../../../utils/web3/context/web3.context';
import RoundedButton from '../../../components/Button/Rounded.components';
import DoubleCollumTextfield from '../../../components/DoubleCollumTextfield';
import config from '../../../commons/config';

export default function AddWalletPage(props) {
    
    const { getLatestField, updatedData, updateDataByKey } = useContext(ProfileContext);
    const {  providers, connect } = useContext(Web3Context);
    let [ selected, setSelected ] = useState(null);
    let [ selectedWallet, setSelectedWallet ] = useState(null);
    let [ reveal, setReveal ] = useState(false);
    let [ showWalletDropdown, setShowWalletDropdown ] = useState(false);
    let [ connectingWallet, setConnectingWallet ] = useState(null);

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

    const toggleReveal = () => {setReveal((prevState)=>{ return !prevState})};
    const toggleDropdown = () => {setShowWalletDropdown((prevState)=>{ return !prevState})};

    const connectMetamask = async () => { 
        const result = await connect("erc");
        console.log("erc", result);
        setConnectingWallet(result[0]);

     }

    const connectSolana = async () => { 
        const result = await connect("solana");
        console.log("solana", result);
        setConnectingWallet(result.toBase58());
    }

    return (
        <div className="pt-64 pb-72 px-10 w-full overflow-hidden bg-theme-bg-dark scroll text-theme-white">
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

                    {! reveal && <div className="text-2xl pt-10">
                        <div className="relative inline-flex align-center w-auto pb-2">
                            <RoundedButton
                                onClick={toggleReveal}>
                                Add Wallet
                            </RoundedButton>
                        </div>
                    </div>}
                    
                    { reveal &&
                        <div>
                            <div className='mt-16'>Connect new wallet</div>
                            <div className="relative w-2/3 mt-4">
                                <div className="fixed absolute left-0 top-0 text-theme-white text-left">
                                    <div className='flex'>
                                        <label class="btn pr-24" onClick={toggleDropdown}>Chain</label>
                                        <img src={`${config.assets.cdn}/arrowDown2.svg`} width="10px" height="10px" alt="arrowDown2" />
                                    </div>
                                    { showWalletDropdown && 
                                    <ul class="mt-2 shadow bg-base-100 rounded-box w-52">
                                        <li className='mt-6 pb-1 w-2/3 border-b border-theme-white' onClick={connectMetamask}><a>Metamask</a></li>
                                        <li className='mt-3 pb-1 w-2/3 border-b border-theme-white' onClick={connectSolana}><a>Phantom</a></li>
                                    </ul>}
                                </div>
                                
                                <div className="fixed absolute left-48 top-0 text-theme-white text-center">
                                    {connectingWallet ? connectingWallet : "Address"}
                                </div>
                                <div className="border-b pt-8 border-theme-white"/>
                            </div>  
                        </div>
                    }
                </div>}
            </div>
        </div>
    );
}