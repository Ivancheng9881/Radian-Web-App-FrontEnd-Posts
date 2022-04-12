import React, { FC } from "react";

interface PageProps {
    passRef: React.RefObject<HTMLDivElement>,
}

const LandingSection : FC<PageProps> = ({children, passRef}) => {
    return (
        <div className="rd-landing-section" ref={passRef}>
            {children}
        </div>
    )
};


export default LandingSection;