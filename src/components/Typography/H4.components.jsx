import TypographyRoot from "./TypographyRoot.components";


const H4 = ({children, alignment='center'}) => {
    return (
        <TypographyRoot>
            <h4
                className={`text-3xl font-normal text-theme-white 
                    ${alignment === 'center' ? 'text-center' : alignment === 'left' ? 'text-left' : 'text-right'}`}>
                {children}
            </h4>
        </TypographyRoot>
    )
};

export default H4;
