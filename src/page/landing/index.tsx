import { FC, useEffect, useRef, useState } from "react";
import LandingSection3 from "./components/Section3";
import DefaultLayout from "../../components/Layout";
import { Layout } from "antd";

import './styles/index.less';
import LandingSection2 from "./components/Section2.components";
import LandingSection1 from "./components/Section1.components";
import DefaultFooter from "./components/Footer";

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
        let currentElHeight = window.innerHeight * NO_OF_ELEMENT;
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

        let target = Math.round(offsetTop / targetEl.clientHeight);
        if (target >= 3) {
            target = 3;
        } else {
            target++
        }

        setSlide(target)        
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
                <LandingSection1 passRef={sec1Ref} isActive={slide === 1} />
                <LandingSection2 passRef={sec2Ref} isActive={slide === 2} />
                <LandingSection3 passRef={sec3Ref} isActive={slide === 3} />
                <div id='rd-scroll-el-height' style={{height: scrollElHeight}}></div>
                <DefaultFooter />
            </Layout.Content>
        </DefaultLayout>
    )
};

export default LangingPage;