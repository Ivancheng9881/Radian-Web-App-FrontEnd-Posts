import { useState } from "react";
import Dropdown from "react-dropdown";
import { useHistory } from "react-router-dom";

// stylesheet
import 'react-dropdown/style.css';
import './selectWallet.styles.css';

// components
import MetamaskIcon from "../../../../components/Icons/metamask.components";
import PhantomIcon from "../../../../components/Icons/phantom.components";
import { createProfileRoute } from "../../../../commons/route";


const SelectWallet = (props) => {

    const history = useHistory();

    const walletOptions = [
        { value: 'phantom', label: <PhantomIcon height={40} width={160} /> },
        { value: 'metamask', label: <MetamaskIcon height={40} width={160} /> },
    ];

    const [selectedWallet, setSelectedWallet ] = useState(undefined);

    const handleChange = (e) => {
        setSelectedWallet(e.value);
        history.push(createProfileRoute);
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
