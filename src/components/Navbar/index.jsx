import { useContext } from "react";
import SolanaContext from "../../utils/web3/solana/solana.context";
import SolanaUtils from "../../utils/web3/solana/solana.utils";
import RoundedButton from "../Button/Rounded.components";
import { truncateAddress } from "../../utils/web3/general/parser.utils";
import "./styles.css";

const Navbar = (props) => {

    const Solana = useContext(SolanaContext);

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
                        Solana.wallet && 
                        <RoundedButton onClick={() => {}}>
                            {truncateAddress(SolanaUtils.parser.publicKeyToString(Solana.wallet))}
                        </RoundedButton> 
                    }
                </div>
            </div>
        </div>

    )
};

export default Navbar;
