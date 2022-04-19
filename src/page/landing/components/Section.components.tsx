import React, { FC } from "react";

interface PageProps {
    passRef: React.RefObject<HTMLDivElement>,
}

const LandingSection : FC<PageProps> = ({children, passRef}) => {

    return (
        <div className="rd-landing-section" ref={passRef}>
            <div className="rd-bkgd-circle-group rd-bkgd-circle-group-1">
                <div className="rd-bkgd-circle rd-bkgd-circle-4 rd-bkgd-circle-orange-1"></div>
                <div className="rd-bkgd-circle rd-bkgd-circle-5 rd-bkgd-circle-purple-2"></div>
            </div>

            <div className="rd-bkgd-circle-group rd-bkgd-circle-group-2">
                <div className="rd-bkgd-circle rd-bkgd-circle-1 rd-bkgd-circle-blue-1"></div>
                <div className="rd-bkgd-circle rd-bkgd-circle-2 rd-bkgd-circle-purple-2"></div>
                <div className="rd-bkgd-circle rd-bkgd-circle-3 rd-bkgd-circle-orange-1"></div>
            </div>

            <div className="rd-bkgd-circle-group rd-bkgd-circle-group-3">
                <div className="rd-bkgd-circle rd-bkgd-circle-1 rd-bkgd-circle-purple-1"></div>
                <div className="rd-bkgd-circle rd-bkgd-circle-2 rd-bkgd-circle-orange-1"></div>
                <div className="rd-bkgd-circle rd-bkgd-circle-3 rd-bkgd-circle-blue-1"></div>
            </div>
            {children}
        </div>
    )
};

export default LandingSection;