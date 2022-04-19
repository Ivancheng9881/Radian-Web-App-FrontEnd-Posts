import { FC } from "react";

interface PageProps {
    label: string,
    required?: boolean
}

const LabelWrapper : FC<PageProps> = ({
    children,
    label,
    required=false
}) => {
    return (
        <div className="rd-input-label-root">
            <div className={`rd-input-label ${required ? 'rd-input-label-required': ''}`}>{label}</div>
            {children}
        </div>
    )
};

export default LabelWrapper;