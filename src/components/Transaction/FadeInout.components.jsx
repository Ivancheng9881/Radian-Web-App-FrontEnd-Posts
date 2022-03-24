const FadeInOut = ({children, visible, scrollUp=false, offset=100}) => {
    return visible && <div>{children}</div>
};

export default FadeInOut;