import TogglerButton from "./TogglerButton.components";


const Toggler = ({
    value, 
    opts,
    handleToggle,
}) => {

    const onClick = (val) => {
        handleToggle(val);
    };

    return (
        <div className="bg-theme-bg-light p-2 rounded-full">
            <div className="inline-flex">
                {opts.map((o) => {
                    return <TogglerButton
                        key={`togglerButton-${o.value}`}
                        active={o.value==value} 
                        value={o.value}
                        label={o.label} 
                        onClick={onClick}
                    />
                })}
            </div>

        </div>
    )
};

export default Toggler;