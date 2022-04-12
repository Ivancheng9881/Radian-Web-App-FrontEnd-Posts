import { FC, lazy, useEffect, useRef, useState } from "react";
import LandingStep from "./components/Steps.compoents";
import DefaultLayout from "../../components/Layout";
import { Layout } from "antd";
import { useSpring, animated, Transition } from 'react-spring'

import './styles/index.less';

interface PageProps {

}

const LangingPage : FC<PageProps> = () => {

    const NO_OF_ELEMENT = 3;

    const [ scrollElHeight, setScrollElHeight ] = useState<number>(0);
    const [ slide, setSlide ] = useState<number>(1);

    const sec1Ref: React.RefObject<HTMLDivElement> = useRef(null);
    const sec2Ref: React.RefObject<HTMLDivElement> = useRef(null);
    const sec3Ref: React.RefObject<HTMLDivElement> = useRef(null);

    const calcElHeight = () => {
        let currentElHeight = window.innerHeight * 3;
        setScrollElHeight(currentElHeight);
    };

    const handleScroll = () => {
        const offsetTop = document.body.scrollTop || document.documentElement.scrollTop;
        let targetEl;

        if (slide === 1) {
            targetEl = sec1Ref.current;
        } else if (slide === 2) {
            targetEl = sec2Ref.current;
        } else if (slide === 3) {
            targetEl = sec3Ref.current;
        }

        const target = Math.round(offsetTop / targetEl.clientHeight);
        console.log(target);
        setSlide(target + 1)
    }

    useEffect(() => {
        calcElHeight()
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })

    return (
        <DefaultLayout>
            <Layout.Content>
                <Transition
                    items={slide === 1}
                    from={{zIndex: -1, opacity: 0}}
                    enter={{zIndex: 1001, opacity: 1}}
                    leave={{zIndex: -1, opacity: 0}}
                    delay={200}
                >
                    {(styles, item) => 
                        item && <animated.span><LandingStep passRef={sec1Ref} /></animated.span>
                    } 
                </Transition>
                <Transition
                    items={slide === 2}
                    from={{zIndex: -1, opacity: 0}}
                    enter={{zIndex: 1001, opacity: 1}}
                    leave={{zIndex: -1, opacity: 0}}
                    delay={200}
                >
                    {(styles, item) => 
                        item && <animated.span><LandingStep passRef={sec2Ref} /></animated.span>
                    } 
                </Transition>
                <Transition
                    items={slide === 3}
                    from={{zIndex: -1, opacity: 0}}
                    enter={{zIndex: 1001, opacity: 1}}
                    leave={{zIndex: -1, opacity: 0}}
                    delay={200}
                >
                    {(styles, item) => 
                        item && <animated.span><LandingStep passRef={sec3Ref} /></animated.span>
                    } 
                </Transition>

                <div id='rd-scroll-el-height' style={{height: scrollElHeight}}></div>
            </Layout.Content>
        </DefaultLayout>
    )
};

export default LangingPage;