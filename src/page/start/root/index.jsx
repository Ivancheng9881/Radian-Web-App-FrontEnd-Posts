import PageTitle from "./components/title.components";
import SelectWallet from "./components/selectWallet.components";
import DownloadWallet from "./components/downloadWallet.components";

const CreateUserPage = (props) => {
    return (
        <div
            className='relative'
        >
            <div
                className='absolute w-full top-60'
            >
                <PageTitle />
                <SelectWallet />
                <DownloadWallet />
            </div>
        </div>
    )
};

export default CreateUserPage;

