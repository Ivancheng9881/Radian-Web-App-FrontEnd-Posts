import { NextComponentType } from "next";
import Image from "next/image";


const Navbar: NextComponentType = (props) => {
    return (
        <div id='RD-navbar'>
            <div
                className='p-4 h-20 bg-theme-bg-light RD-shadow'
            >
                <Image 
                    src="/logos/radian.png"
                    width="149px"
                    height="41px"
                />
            </div>
        </div>

    )
};

export default Navbar;