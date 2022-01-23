import { useEffect, useState } from 'react';
import PageTitle from './components/title.components';
import SelectWallet from './components/selectWallet.components';
import DownloadWallet from './components/downloadWallet.components';

const CreateUserPage = (props) => {
    const [ connectWallet, setConnectedWallet ] = useState(false);

    useEffect(() => {
        //TODO: check whether userWallet is connected (only for MetaMask case)
        // If connected, push to next page
    }, []);

    return (
        <div className="relative">
            <div className="absolute w-full top-60">
                <PageTitle />
                <SelectWallet setConnectedWallet={setConnectedWallet} />
                <DownloadWallet connectWallet={connectWallet} />
            </div>
        </div>
    );
};

export default CreateUserPage;
