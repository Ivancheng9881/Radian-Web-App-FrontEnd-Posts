
const Indicator = ({label, value, current}) => {
    return (
        <div className={`flex item-baseline w-1/4 h-32 ${current===value && 'border-b-2 border-theme-dark-blue'}`}>
            <div className="h-fit m-auto text-theme-body-text">
                {label}
            </div>
        </div>
    )
}

const CreateProfileIndicator = ({
    step,
    stepList,
    indicatorOpts
}) => {


    return (
        <div className="inline-flex w-full">
            {
                indicatorOpts.map((opts) => {
                    return (
                        <Indicator 
                            key={opts.value}
                            current={stepList[step].stage}
                            {...opts}
                        />
                    )
                })
            }
        </div>
    )
};

export default CreateProfileIndicator;