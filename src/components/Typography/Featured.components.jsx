import TypographyRoot from "./TypographyRoot.components";


const Featured = ({children, alignment='center'}) => {

    return (
        <TypographyRoot>
            <p
                className={`RD-featuredText text-2xl mb-4  
                    ${alignment === 'center' ? 'text-center' : alignment === 'left' ? 'text-left' : 'text-right'}`}>
                {children}
            </p>
        </TypographyRoot>
    )
};

export default Featured;
