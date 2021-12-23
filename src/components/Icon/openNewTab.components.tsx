import Image from "next/image"
import { IconInterface } from "./icon.interface";

const OpenNewTabIcon: React.FC<IconInterface> = ({height=0, width=0}) => {
    return (
        <Image 
            src='/icons/openInNewTab.png'
            width={width}
            height={height}
            quality={100}
        />
    )
};

export default OpenNewTabIcon;