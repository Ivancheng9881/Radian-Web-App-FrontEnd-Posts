import TogglerButton from "./TogglerButton.components";


const Toggler = ({
    value, 
    opts,
    handleToggle,
    size='large'
}) => {

    const onClick = (val) => {
        handleToggle(val);
    };

    return (
        <div className={`bg-theme-bg-light p-2 ${opts.length > 2 ? 'rounded-2xl sm:rounded-full' : 'rounded-full'}`}>
            <div className={`inline-flex ${opts.length > 2 && 'flex-col'} sm:flex-row`}>
                {opts.map((o) => {
                    return <TogglerButton
                        key={`togglerButton-${o.value}`}
                        active={o.value==value} 
                        value={o.value}
                        label={o.label} 
                        onClick={onClick}
                        size={size}
                    />
                })}
            </div>

        </div>
    )
};

export default Toggler;