const OutlinedTextfield = (props) => {
    const { className='', type, placeholder, name, value, onChange = undefined } = props;    
    return (
        <div id="RD-Textfield" className="mr-5">
            <div className="border-b border-theme-gray pb-2 pl-1 pr-1">
                <input
                    className={`RD-Autocomplete-disabler ${className} bg-theme-bg-dark text-4xl text-theme-gray border-0`}
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
