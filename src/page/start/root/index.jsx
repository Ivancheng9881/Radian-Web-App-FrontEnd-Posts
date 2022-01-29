import { useEffect, useState } from 'react';
import PageTitle from './components/title.components';
import SelectWallet from './components/selectWallet.components';
import DownloadWallet from './components/downloadWallet.components';

const CreateUserPage = (props) => {
    const [ selectedWallet, setSelectedWallet ] = useState(`Choose Wallet`);

    return (
        <div className="relative">
            <div className="absolute w-full top-60">
                <PageTitle />
                <SelectWallet selectedWallet={selectedWallet} setSelectedWallet={setSelectedWallet} />
                <DownloadWallet selectedWallet={selectedWallet} />
            </div>
        </div>
    );
};

export default CreateUserPage;
