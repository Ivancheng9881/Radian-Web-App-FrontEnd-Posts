
const TogglerButton = ({
    active=false,
    label,
    value,
    onClick,
    size
}) => {
    return (
        <div 
            className={`rounded-full min-w-fit w-32 text-center 
                ${size == 'large' ? 'p-2 pt-3 pb-3 w-32' : 'p-1 pt-1.5 pb-1.5 w-24'}
                cursor-pointer transition-all duration-400
                ${active ? `bg-theme-bg-dark` : 'bg-theme-bg-light' }
            `}
            onClick={() => onClick(value)}
        >
            <div 
                className={
                    `text-theme-white
                    ${size == 'large' ? 'text-2xl' : 'text-normal'}`
                }
            >
                {label}
            </div>
        </div>
    )
};

export default TogglerButton;