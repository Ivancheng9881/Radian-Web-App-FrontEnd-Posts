const PhantomIcon = ({height=0, width=0}) => {
    
    return (
        <img 
            src={'/logos/phantom.png'}
            width={width}
            height={height}
            quality={100}
            style={{height, width}}
            alt="phantom wallet icon"
        />
    )
};

export default PhantomIcon;