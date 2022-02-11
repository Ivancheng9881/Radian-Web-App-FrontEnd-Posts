const RoundedButton = ({ children, onClick, style="", pl=6, pr=6, disabled = false}) => {
    const handleClick = async (e) => {
        if (disabled) return;
        onClick();
    };

    return (
        <div
            className={`bg-theme-light-blue truncate text-theme-white text-center rounded-full py-2 w-54 pl-${pl} pr-${pr} transition-all ${style}
                ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
            onClick={handleClick}
        >
            {children}
        </div>
    );
};

export default RoundedButton;
