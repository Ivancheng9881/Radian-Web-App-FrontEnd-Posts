import { useContext, useState } from "react";
import Dropdown from "react-dropdown";
import { useHistory } from "react-router-dom";

// stylesheet
import 'react-dropdown/style.css';
import './selectWallet.styles.css';

// components
import MetamaskIcon from "../../../../components/Icons/metamask.components";
import PhantomIcon from "../../../../components/Icons/phantom.components";
import { createProfileRoute } from "../../../../commons/route";
import Web3Context from "../../../../utils/web3/context/web3.context";


const SelectWallet = (props) => {

    const history = useHistory();
    const web3Context = useContext(Web3Context);

    const walletOptions = [
        { value: 'phantom', label: <PhantomIcon height={40} width={160} /> },
        { value: 'metamask', label: <MetamaskIcon height={40} width={160} /> },
    ];

    const [selectedWallet, setSelectedWallet ] = useState(undefined);

    const handleChange = async (e) => {
        let pubKey;
        let prevState = selectedWallet;
        setSelectedWallet(e.value);
        if (e.value === 'phantom') {
            pubKey = await web3Context.connect('solana')
        } else if (e.value === 'metamask') (
            pubKey = await web3Context.connect('erc')
        )
        // const pubKey = await web3Context.connect();
        if (pubKey) {
            history.push(createProfileRoute);
        } else {
            setSelectedWallet(prevState);
        }
    }

    return (
        <div 
            className='w-80 ml-auto mr-auto mt-10'
            id="RD-SelectWallet"
        >
            <Dropdown 
                options={walletOptions}
                value={selectedWallet}
                onChange={handleChange}
                placeholder={`Choose wallet`}
            />
        </div>
    )
};

export default SelectWallet;
