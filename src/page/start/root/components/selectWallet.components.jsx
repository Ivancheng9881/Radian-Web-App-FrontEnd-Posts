import { useContext, useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
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

const SelectWallet = (props) => {
    const history = useHistory();
    const web3Context = useContext(Web3Context);
    const {selectedWallet, setSelectedWallet } = props;
    const [ dropDownState, setDropDownState ] = useState([]);

    useEffect(()=>{
        setDropDownState(
            [
                { value: 'phantom', label: <PhantomIcon height={40} width={160} /> },
                { value: 'metamask', label: <MetamaskIcon height={40} width={160} /> }
            ]
        );
    }, []);

    // const walletOptions = [
    //     { value: 'phantom', label: <PhantomIcon height={40} width={160} /> },
    //     { value: 'metamask', label: <MetamaskIcon height={40} width={160} /> }
    // ];

    const handleChange = async (e) => {
        let pubKey;
        let profile;
        let prevState = selectedWallet;

        setSelectedWallet(e.value);

        if (e.value === 'phantom') {
            pubKey = await web3Context.connect('solana');
            // profile = await hasPersonalProfileSolana(pubKey);
            profile = null;
            // TODO edit here
            console.log('window connect solana', pubKey);
        } 
        else if (e.value === 'metamask') {
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
        <div className="w-80 ml-auto mr-auto mt-10" id="RD-SelectWallet">
            <Dropdown
                options={dropDownState}
                onChange={handleChange}
                value={selectedWallet}
                placeholder={selectedWallet}
            />
        </div>
    );
};

export default SelectWallet;
