import { FC, useEffect, useRef, useState } from "react";
import LandingSection3 from "./components/Section3";
import DefaultLayout from "../../components/Layout";
import { Layout } from "antd";

import LandingSection2 from "./components/Section2";
import LandingSection1 from "./components/Section1";
import DefaultFooter from "../../components/Footer";
import ScrollIndicator from "../../components/ScrollIndicator";
import { useLocation } from "react-router";

interface LocationState {
    scrollToSection?: number
}

const LangingPage = () => {

    const NO_OF_ELEMENT = 3;

    const location = useLocation<LocationState>();

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

        let heightPerSlide = window.innerHeight;
        let _slide = Math.round(offsetTop / heightPerSlide) + 1;

        setSlide(_slide)       
    }

    const handleResize = () => {
        calcElHeight();
    }

    useEffect(() => {
        calcElHeight()
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        }
    }, [scrollElHeight])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    useEffect(() => {
        if (location?.state?.scrollToSection > 0) {
            let offset = (location.state.scrollToSection - 1) * window.innerHeight;
            window.scrollTo(0, offset);
        }
    }, [location.state])

    return (
        <DefaultLayout>
            <Layout.Content>
                <LandingSection1 passRef={sec1Ref} isActive={slide === 1} />
                <LandingSection2 passRef={sec2Ref} isActive={slide === 2} />
                <LandingSection3 passRef={sec3Ref} isActive={slide === 3} />
                <div id='rd-scroll-el-height' style={{height: scrollElHeight}}></div>
                <ScrollIndicator />
                <DefaultFooter />
            </Layout.Content>
        </DefaultLayout>
    )
};

export default LangingPage;