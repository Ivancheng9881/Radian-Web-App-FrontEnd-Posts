

const RoundedButton = ({
    children,
    onClick,
    disabled=false,
}) => {
    const handleClick = async (e) => {
        if (disabled) return;
        onClick();
    };


    return (
        <div
            className={`bg-theme-light-blue text-theme-white rounded-full pt-2 pb-2 pl-6 pr-6 transtion-all
                ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
            onClick={handleClick}
        >
            {children}
        </div>
    )
};

export default RoundedButton;