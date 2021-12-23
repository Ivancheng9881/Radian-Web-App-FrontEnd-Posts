import { NextComponentType } from "next";
import Typography from "../../components/Typography/index.components";
import DownloadWallet from "./downloadWallet.homeComponent";
import SelectWallet from "./selectWallet.homeComponent";
import HomePageTitle from "./title.homeComponent";


const HomeRoot: NextComponentType = (props) => {
    return (
        <div
            className='relative'
        >
            <div
                className='absolute w-full top-60'
            >
                <HomePageTitle />
                <SelectWallet />
                <DownloadWallet />
            </div>
        </div>
    )
};  

export default HomeRoot