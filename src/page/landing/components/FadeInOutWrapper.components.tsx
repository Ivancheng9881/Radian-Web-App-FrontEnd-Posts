import { FC } from "react";
import { Transition, animated } from "react-spring";

interface PageProps {
    isActive: boolean,
}

const LandingFadeInOutWrapper : FC<PageProps> = ({isActive, children}) => {

    return (
        <Transition
            items={isActive}
            from={{opacity: 0}}
            enter={{opacity: 1}}
            leave={{opacity: 0}}
            delay={0}
        >
            {(styles, item) => item && <animated.span style={styles}>{children}</animated.span> }
        </Transition>
    )
};

export default LandingFadeInOutWrapper;