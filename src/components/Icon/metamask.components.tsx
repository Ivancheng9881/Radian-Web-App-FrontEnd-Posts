import { NextComponentType } from "next"
import Image from "next/image"
import { IconInterface } from "./icon.interface";

const MetamaskIcon: React.FC<IconInterface> = ({height=0, width=0}) => {
    return (
        <Image 
            src='/logos/metamask.png'
            width={width}
            height={height}
            quality={100}
        />
    )
};

export default MetamaskIcon;