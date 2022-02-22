import ArrowDownIcon from "../Icons/arrowDown.components";


const ArrowUpButton = ({
    onClick,
    disabled=false,
}) => {
    
    const handleClick = (e) => {
        e.preventDefault();
        if (disabled) return;
        onClick(e);
    };
    
    return (
        <div 
            className={`h-16 w-16 bg-theme-dark-blue rounded-full flex transition-all
            ${disabled ? 'opacity-40' : 'cursor-pointer opacity-100'}`
        }
            style={{transform: 'rotate(180deg)'}}
            onClick={handleClick}
        >
            <ArrowDownIcon />
        </div>
    )
};

export default ArrowUpButton;