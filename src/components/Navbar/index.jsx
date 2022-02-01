import { useContext, useState, useRef, useEffect } from 'react';
import Web3Context from '../../utils/web3/context/web3.context';
// import SolanaUtils from '../../utils/web3/context/solana.utils';
import RoundedButton from '../Button/Rounded.components';
import { truncateAddress } from '../../utils/web3/general/parser.utils';
import { useHistory } from 'react-router-dom';
import { mainRoute } from '../../commons/route';
import './styles.css';

import MetamaskIcon from '../Icons/metamask.components';
import PhantomIcon from '../Icons/phantom.components';
import Popup from 'reactjs-popup';

const Navbar = (props) => {
    const web3Context = useContext(Web3Context);
    const history = useHistory();
    const [ itemState, setItemState ] = useState([]);
    const [ change, setChange ] = useState(false);

    const getElement = (providerType, click=true)=>{

        if (providerType === "metamask@erc"){
            return web3Context.provider[providerType]?
                <RoundedButton onClick={() => {return click ? switchWalletPriority(providerType) : null}}>
                            {"ERC: " + truncateAddress(web3Context.provider[providerType])}
                </RoundedButton> :
                <RoundedButton pl={7} pr={8} onClick={()=>{return click ? switchWalletPriority(providerType) : null}}>
                        <MetamaskIcon height={60} width={120}/>
                </RoundedButton>
        } else {
            return web3Context.provider[providerType]?
                <RoundedButton onClick={() => {return click ? switchWalletPriority(providerType) : null}}>
                    {"Solana: " + truncateAddress(web3Context.provider[providerType].toBase58())}
                </RoundedButton> :
                <RoundedButton pl={7} pr={7} onClick={()=>{return click ? switchWalletPriority(providerType) : null}}>
                        <PhantomIcon height={60} width={120}/>
                </RoundedButton>
        }
    }
    

    useEffect(()=>{
        console.log(web3Context.provider);
        const newItemState = [ getElement(web3Context.provider.selected, false) ];
        const keys = Object.keys(web3Context.provider);
        for ( let k = 0 ; k < keys.length ; k++ ) {
            if (keys[k] !== "selected" && keys[k] !== web3Context.provider.selected ) {
                newItemState.push(getElement(keys[k]));
            }
        }
        console.log("set state triggered");
        setItemState(newItemState);
    },[web3Context.provider, change]);

    const ref = useRef();
    const close = () => ref.current.close();

    const switchWalletPriority = async (walletType) => {
        
        // attempt to connect to wallet if not connected
        if ( !web3Context.provider[walletType] ) {
            await web3Context.connect(walletType.split("@")[1]);
        }

        // switch new wallet to selected if successfully connected        
        if ( web3Context.provider[walletType] ) {
            web3Context.provider.selected = walletType;
            setChange((o) => !o); // notify useEffect of the change
        }

        // switch off the pop up
        close();
    }

    return (
        <div id="RD-navbar" className="fixed w-full top-0 z-50">
            <div className="p-4 h-20 bg-theme-bg-light RD-shadow flex justify-between">
                <div className="cursor-pointer" onClick={() => history.push(mainRoute)}>
                    <img src="/logos/radian.png" width="149px" height="41px" alt="radian logo" />
                </div>

                {/* Wallet address on Navbar */}
                <div>
                    {web3Context.provider[web3Context.provider.selected] && (
                        <Popup
                            trigger={<button> 
                                        {itemState[0]}                                     
                                    </button>} 
                            position="bottom center"
                            closeOnDocumentClick
                            arrow={false}
                            ref={ref}
                            >
                            <div className="pt-1 pl-7">
                                {itemState[1]}
                            </div>
                        </Popup>
                        
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
