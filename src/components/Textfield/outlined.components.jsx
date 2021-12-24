
const OutlinedTextfield = ({
    placeholder='',
    name='',
    value='',
    onChange=undefined
}) => {
    return (
        <div className="mr-5">
            <div className="border-b border-theme-gray pb-2 pl-1 pr-1">
                <input
                    className="bg-theme-bg-dark text-4xl text-theme-gray border-0"  
                    placeholder={placeholder}
                    value={value}
                    name={name}
                    onChange={onChange}
                />
            </div>
        </div>
    )
};

export default OutlinedTextfield;