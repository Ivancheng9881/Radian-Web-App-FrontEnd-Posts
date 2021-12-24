import TypographyRoot from "./TypographyRoot.components";


const H2 = ({children, alignment='center'}) => {
    return (
        <TypographyRoot>
            <h2 
                className={`text-5xl font-normal text-theme-white 
                    ${alignment === 'center' ? 'text-center' : alignment === 'left' ? 'text-left' : 'text-right'}`}>
                {children}
            </h2>
        </TypographyRoot>
    )
};

export default H2;
