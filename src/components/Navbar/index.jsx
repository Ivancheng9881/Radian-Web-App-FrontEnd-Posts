import { useContext } from "react";
import Web3Context from "../../utils/web3/context/web3.context";
import SolanaUtils from "../../utils/web3/context/solana.utils";
import RoundedButton from "../Button/Rounded.components";
import { truncateAddress } from "../../utils/web3/general/parser.utils";
import "./styles.css";
import { useHistory } from "react-router-dom";
import { startRoute } from "../../commons/route";

const Navbar = (props) => {

    const web3Context = useContext(Web3Context);
    const history = useHistory();

    return (
        <div id='RD-navbar' className="fixed w-full top-0 z-50">
            <div
                className='p-4 h-20 bg-theme-bg-light RD-shadow flex justify-between'
            >
                <div 
                    className="cursor-pointer"
                    onClick={() => history.push(startRoute)}>
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
