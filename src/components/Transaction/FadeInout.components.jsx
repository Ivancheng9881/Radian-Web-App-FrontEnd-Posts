import { Fragment } from "react";
import { useTransition, animated } from "react-spring";

const FadeInOut = ({children, visible, scrollUp=false}) => {

    const transition = useTransition(visible, {
        from:   { y: scrollUp ? 100 : -100, opacity: 0 },
        enter:  { y: 0, opacity: 1 },
        leave:  { y: scrollUp ? -100 : 100, opacity: 0 },
    });

    return (
        <Fragment>
            {transition((style, item) => 
                item && <animated.div style={style} >{children}</animated.div>
            )}
        </Fragment>
    )
};

export default FadeInOut;