import { useContext } from "react";
import Web3Context from "../../utils/web3/context/web3.context";
import SolanaUtils from "../../utils/web3/context/solana.utils";
import RoundedButton from "../Button/Rounded.components";
import { truncateAddress } from "../../utils/web3/general/parser.utils";
import "./styles.css";

const Navbar = (props) => {

    const web3Context = useContext(Web3Context);

    return (
        <div id='RD-navbar' className="fixed w-full top-0 z-50">
            <div
                className='p-4 h-20 bg-theme-bg-light RD-shadow flex justify-between'
            >
                <div>
                    <img 
                        src="/logos/radian.png"
                        width="149px"
                        height="41px"
                        alt='radian logo'
                    />
                </div>
                <div>
                    { 
                        web3Context.wallet && 
                        <RoundedButton onClick={() => {}}>
                            {truncateAddress(web3Context.wallet.toString())}
                        </RoundedButton> 
                    }
                </div>
            </div>
        </div>

    )
};

export default Navbar;
