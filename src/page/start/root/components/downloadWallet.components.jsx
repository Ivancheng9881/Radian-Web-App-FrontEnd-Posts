import OpenNewTabIcon from '../../../../components/Icons/openNewTab.components';
import ComponentWrapper from '../../../../components/ComponentWrapper';
import UAParser from 'ua-parser-js';

const DownloadWallet = (props) => {
    const { selectedWallet } = props;
    
    const handleClick = (e) => {
        const userAgent = new UAParser();
        const { name } = userAgent.getBrowser();
        let downloadLink;

        switch (name.toUpperCase()) {
            case 'CHROME':
                downloadLink =
                    'https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa?hl=en';
                break;
            case 'FIREFOX':
                downloadLink = 'https://addons.mozilla.org/en-US/firefox/addon/phantom-app/';
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
