import { useContext, useState, useRef, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

// stylesheet
import 'react-dropdown/style.css';
import './selectWallet.styles.css';

// components
import MetamaskIcon from '../../../../components/Icons/metamask.components';
import PhantomIcon from '../../../../components/Icons/phantom.components';
import { createProfileRoute } from '../../../../commons/route';
import Web3Context from '../../../../utils/web3/context/web3.context';
import { hasPersonalProfileErc } from '../../../../utils/web3/contract/profileContract/erc';
import RoundedButton from '../../../../components/Button/Rounded.components';
import Popup from 'reactjs-popup';

const SelectWallet = (props) => {
    const history = useHistory();
    const web3Context = useContext(Web3Context);
    const {selectedWallet, setSelectedWallet } = props;

    const ref = useRef();
    const close = () => ref.current.close();
    const dummy = ()=>{console.log("Triggered")};

    const buttons = {
        "connect":  <RoundedButton onClick={dummy}>
                        <div className='text-2xl'>
                            Connect Wallet
                        </div>
                    </RoundedButton>,
        'phantom':  <RoundedButton onClick={()=>{handleChange("phantom")}}>
                        <PhantomIcon height={50} width={160}/>
                    </RoundedButton>,
        'metamask': <RoundedButton onClick={()=>{handleChange("metamask")}}>
                        <MetamaskIcon height={50} width={160}/>
                    </RoundedButton>            
    };

    const [itemState, setItemState] = useState([
        buttons["connect"],
        buttons['phantom'],
        buttons['metamask']
    ]);

    const handleChange = async (value) => {
        let pubKey;
        let profile;
        let prevState = selectedWallet;

        close();
        setItemState(value == 'phantom' ? [buttons['phantom'], buttons['metamask']] : [buttons['metamask'], buttons['phantom']]);

        setSelectedWallet(value);

        if (value === 'phantom') {
            pubKey = await web3Context.connect('solana');
            // profile = await hasPersonalProfileSolana(pubKey);
            profile = null;
            // TODO edit here
            console.log('window connect solana', pubKey);
        } 
        else if (value === 'metamask') {
            pubKey = await web3Context.connect('erc');
            profile = await hasPersonalProfileErc(pubKey[0]);
            console.log('window connect Metamask', pubKey);
        }
        // const pubKey = await web3Cbontext.connect();
        if (pubKey) {
            if (profile) {
                history.goBack();                
            } else {
                history.push(createProfileRoute);
            }
        } else {
            setSelectedWallet(prevState);
        }
    };

    return (
        <div className=" mt-10 text-center pl-2">
            <Popup
                trigger={<button> 
                            {itemState[0]}
                        </button>} 
                position="bottom center"
                closeOnDocumentClick
                arrow={false}
                ref={ref}
                >
                <div className="pt-1 pl-3">
                    {itemState.slice(1,itemState.length).map(
                        (b,i)=>{
                            return  <div key={i}>
                                        {b}
                                        <div className='pt-1'></div>
                                    </div>
                        }
                    )}                    
                </div>
            </Popup>

        </div>
    );
};

export default SelectWallet;
