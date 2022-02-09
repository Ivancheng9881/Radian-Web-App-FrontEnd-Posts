import { Fragment, useState } from "react";
import { useTransition, animated } from "react-spring";
import { useEffect } from "react";

const FadeInOut = ({children, visible, scrollUp=false, offset=100}) => {

    useEffect(()=>{
        window.scrollTo({ top: 80, behavior: 'instant' });
    })

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
    return visible && <div>{children}</div>
};

export default FadeInOut;