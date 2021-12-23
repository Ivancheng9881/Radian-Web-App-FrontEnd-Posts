import { NextComponentType } from "next";
import OpenNewTabIcon from "../../components/Icon/openNewTab.components";
import ComponentWrapper from "../../components/utils/componentWrapper.components";


const DownloadWallet: NextComponentType = () => {
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