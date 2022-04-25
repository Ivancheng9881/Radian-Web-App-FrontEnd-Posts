import { FC, useEffect, useState } from "react";

interface PageProps {
    label: string,
    required?: boolean
    isError?: boolean
}

const LabelWrapper : FC<PageProps> = (props) => {
    const {
        children,
        label,
        required=false,
        isError=false,
    } = props;

    const [ vibrate, setVibrate ] = useState(false);

    useEffect(() => {
        if (isError) {
            setVibrate(true);
            setTimeout(() => {
                setVibrate(false);
            }, 2000);
        }
    }, [isError])

    return (
        <div className={`rd-input-label-root ${isError ? 'rd-input-error-root' : ''}`}>
            <div className={`rd-input-label ${required ? 'rd-input-label-required': ''} ${vibrate ? 'rd-active' : ''}`}>{label}</div>
            {children}
        </div>
    )
};

export default LabelWrapper;