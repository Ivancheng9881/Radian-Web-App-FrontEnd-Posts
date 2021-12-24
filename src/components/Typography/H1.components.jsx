import TypographyRoot from "./TypographyRoot.components";


const H1 = ({children}) => {
    return (
        <TypographyRoot>
            <h1 className='text-6xl font-bold text-theme-white text-center'>
                {children}
            </h1>
        </TypographyRoot>
    )
};

export default H1;
