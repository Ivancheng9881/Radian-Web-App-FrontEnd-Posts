import config from "../../commons/config";

const ArrowDownIcon = ({height=0, width=0}) => {
    return (
        <img 
            className="m-auto select-none"
            src={`${config.assets.cdn}/arrowDown.png`}
            width={20}
            height={20}
            alt="scroll down icon"
        />
    )
};

export default ArrowDownIcon;