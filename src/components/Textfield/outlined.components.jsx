const OutlinedTextfield = (props) => {
    const { type, placeholder, name, value, onChange = undefined } = props;
    console.log('Outlined type', type);
    return (
        <div className="mr-5">
            <div className="border-b border-theme-gray pb-2 pl-1 pr-1">
                <input
                    className="bg-theme-bg-dark text-4xl text-theme-gray border-0"
                    placeholder={placeholder}
                    value={value}
                    type={type}
                    name={name}
                    onChange={onChange}
                    autoComplete="off"
                />
            </div>
        </div>
    );
};

export default OutlinedTextfield;
