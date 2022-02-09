import { Fragment } from "react";
import { useTransition, animated } from "react-spring";

const FadeInOut = ({children, visible, scrollUp=false, offset=100}) => {

    const transition = useTransition(visible, {
        from:   { y: scrollUp ? offset : -offset, opacity: 0, },
        enter:  { y: 0, opacity: 1 },
        leave:  { y: scrollUp ? -offset : offset, opacity: 0 },
    });

    // return (
    //     <Fragment>
    //         {transition((style, item) => 
    //             item && <animated.div style={style} >{children}</animated.div>
    //         )}
    //     </Fragment>
    // )

    // disable animation
    return visible && <div className="">{children}</div>
};

export default FadeInOut;