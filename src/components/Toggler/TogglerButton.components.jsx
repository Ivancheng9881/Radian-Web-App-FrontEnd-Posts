
const TogglerButton = ({
    active=false,
    label,
    value,
    onClick,
}) => {
    return (
        <div 
            className={`rounded-full min-w-fit w-32 text-center p-2 pt-3 pb-3 
                cursor-pointer transition-all duration-400
                ${active ? `bg-theme-bg-dark` : 'bg-theme-bg-light' }
            `}
            onClick={() => onClick(value)}
        >
            <div 
                className={
                    `text-theme-white text-2xl`
                }
            >
                {label}
            </div>
        </div>
    )
};

export default TogglerButton;