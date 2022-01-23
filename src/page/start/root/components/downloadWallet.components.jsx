import OpenNewTabIcon from '../../../../components/Icons/openNewTab.components';
import ComponentWrapper from '../../../../components/ComponentWrapper';
import UAParser from 'ua-parser-js';

const DownloadWallet = (props) => {
    const { connectWallet } = props;
    const handleClick = () => {
        const userAgent = new UAParser();
        const { name } = userAgent.getBrowser();
        let downloadLink;

        console.log('Agent name', name);

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
        connectWallet && (
            <div id="RD-DownloadWallet" className="text-center text-theme-white mt-">
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
