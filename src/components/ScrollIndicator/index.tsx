import { FC } from "react";

interface ScrollIndicatorProps {
    hidden?: boolean
}

const ScrollIndicator : FC<ScrollIndicatorProps> = ({hidden=false}) => {

    return (
        <div className={`rd-scroll-root ${hidden ? 'rd-scroll-root-hidden' : ''}`}>
            <div className="rd-scroll-body">
                <div className="rd-scroll-dot-root"></div>
            </div>
        </div>
    )
};

export default ScrollIndicator;