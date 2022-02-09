import OpenNewTabIcon from '../../../../components/Icons/openNewTab.components';
import ComponentWrapper from '../../../../components/ComponentWrapper';
import UAParser from 'ua-parser-js';

const DownloadWallet = (props) => {
    const { selectedWallet } = props;

    if (selectedWallet === "phantom" && window.solana ) return <div/>;
    if (selectedWallet === "metamask" && window.ethereum ) return <div/>;

    const handleClick = (e) => {
        const userAgent = new UAParser();
        const { name } = userAgent.getBrowser();
        let downloadLink;

        switch (name.toUpperCase() + "/" + selectedWallet.toUpperCase()) {
            case 'CHROME/PHANTOM':
                downloadLink =
                    'https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa?hl=en';
                break;
            case 'FIREFOX/PHANTOM':
                downloadLink = 'https://addons.mozilla.org/en-US/firefox/addon/phantom-app/';
                break;
            case 'CHROME/METAMASK':
                downloadLink =
                    'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';
                break;
            case 'FIREFOX/METAMASK':
                downloadLink = 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/';
                break;
        }
        window.open(downloadLink, '_blank').focus();
    };
    return (
        selectedWallet !== 'Choose Wallet' && (
            <div id="RD-DownloadWallet" className="text-center text-theme-white">
                <ComponentWrapper>
                    <div className="flex justify-center items-center" onClick={handleClick}>
                        <div className="flex cursor-pointer">
                            <OpenNewTabIcon height={32} width={32} />
                            <span className="text-xl ml-2">download wallet</span>
                        </div>
                    </div>
                </ComponentWrapper>
            </div>
        )
    );
};

export default DownloadWallet;
