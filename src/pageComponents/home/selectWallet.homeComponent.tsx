import { NextComponentType } from "next";
import { useState } from "react";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';
import MetamaskIcon from "../../components/Icon/metamask.components";
import PhantomIcon from "../../components/Icon/phantom.components";


const SelectWallet: NextComponentType = (props) => {

    const walletOptions = [
        { value: 'phantom', label: <PhantomIcon height={40} width={160} /> },
        { value: 'metamask', label: <MetamaskIcon height={40} width={160} /> },
    ];

    const [selectedWallet, setSelectedWallet ] = useState(undefined);

    const handleChange = (e: any) => {
        setSelectedWallet(e.value);
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