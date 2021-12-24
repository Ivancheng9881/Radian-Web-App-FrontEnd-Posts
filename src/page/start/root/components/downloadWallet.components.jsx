import OpenNewTabIcon from "../../../../components/Icons/openNewTab.components";
import ComponentWrapper from "../../../../components/ComponentWrapper";


const DownloadWallet = () => {
    return (
        <div
            id="RD-DownloadWallet"
            className='text-center text-theme-white mt-'
        >
            <ComponentWrapper>
                <div 
                    className='flex justify-center'
                >
                    <OpenNewTabIcon 
                        height={32} 
                        width={32} 
                    />
                    <span
                        className='text-xl ml-2'
                    >
                        download wallet
                    </span>
                </div>
            </ComponentWrapper>
        </div>
    )
};

export default DownloadWallet;
