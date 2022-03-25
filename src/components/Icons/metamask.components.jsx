import config from "../../commons/config";

const MetamaskIcon  = ({height=0, width=0}) => {
    return (
        <img 
            src={`${config.assets.cdn}/metamask.png`}
            width={width}
            height={height}
            quality={100}
            style={{height, width}}
            alt="metamask-icon"
        />
    )
};

export default MetamaskIcon;