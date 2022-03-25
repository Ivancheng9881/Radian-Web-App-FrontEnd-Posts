import config from "../../commons/config";

const OpenNewTabIcon= ({height=0, width=0}) => {
    return (
        <img 
            src={`${config.assets.cdn}/openInNewTab.png`}
            width={width}
            height={height}
            quality={100}
            alt="open in new tab icon"
        />
    )
};

export default OpenNewTabIcon;