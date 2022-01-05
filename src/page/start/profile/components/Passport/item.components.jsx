
import { memo } from "react";

const PassportItem = memo(({
    label, value
}) => {
    return (
        <div className="text-theme-white block">
            <span>{label}: </span>
            <span>{value}</span>
        </div>

    )
});

export default PassportItem;