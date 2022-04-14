import { FC } from "react";

const GlassCard : FC = ({children}) => {
    return (
        <div className="rd-glass-root">
            {children}
        </div>
    )
};

export default GlassCard;