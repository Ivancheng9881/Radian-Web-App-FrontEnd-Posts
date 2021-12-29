
const ItemOption = ({
    value,
    label,
    handleSelect,
    active,
}) => {
    return (
        <div className="p-2">
            <div 
                className={`text-theme-white w-max cursor-pointer
                    pt-3 pb-3 pl-6 pr-6 rounded-full text-2xl transition-all
                    ${active ? 'bg-theme-dark-blue' : 'bg-theme-dark-blue/50'}
                `}
                onClick={() => handleSelect(value)}
            >
                {label}
            </div>
        </div>
    )
};

export default ItemOption;