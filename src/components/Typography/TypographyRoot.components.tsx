import { NextComponentType } from "next";

const TypographyRoot: NextComponentType = ({children}) => {
    return (
        <div className='leading-5'>
            {children}
        </div>
    )
};

export default TypographyRoot;