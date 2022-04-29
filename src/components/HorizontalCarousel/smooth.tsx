import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState, FC, useEffect, useRef, useLayoutEffect, memo, ReactChildren, ReactNode, ReactChild, Children } from "react";
import { StyleSheet } from "../../schema/helper.interface";

interface PageProps {
    itemWidth: number,
    itemPadding?: number,
    iconSize?: number,
    iconMargin?: number,
    count: number,
    autoScroll?: boolean
}

const HorizontalCarouselSmooth : FC<PageProps> = ({
    children,
    itemWidth,
    itemPadding=10,
    iconSize=30,
    iconMargin=10,
    count,
    autoScroll=false
}) => {

    const INTERVAL_S = 0.5;

    const bodyInnerRef = useRef<HTMLDivElement>(null);
    const intervalId = useRef(null);

    const [ items, setItems ] = useState(React.Children.toArray(children));
    const [ offset, setOffset ] = useState(0);

    const styles: StyleSheet = {
        root: {
            width: '100%',
            display: 'flex',
        },
        controller: { 
            margin: `0 0 0 ${iconMargin}px`, 
            textAlign: 'center',
            display: 'flex',
            alignSelf: 'center'
        },
        body: {
            display: 'block',
            // width: 'calc(100% - 30px)',
            overflow: 'hidden',
        },
        bodyInner: {
            width: '100%',
            display: 'flex',
            marginLeft: `${-((itemWidth + itemPadding * 2) / 4) * offset}px`,
            transition: `ease all ${INTERVAL_S}s`,
            transitionTimingFunction: 'linear',
        },
        itemWrapper: {
            padding: `0px ${itemPadding}px`
        },
        button: {
            width: `${iconSize}px`
        },
    };

    const handleNext = () => {
        setOffset((prevState) => {
            prevState++;
            return prevState
        });
    };

    const handleMouseOver = () => {
        stop();
    };

    const handleMouseLeave = () => {
        start();
    }

    const start = () => {
        intervalId.current = setInterval(() => {
            handleNext();
        }, INTERVAL_S * 1000);
    };

    const stop = () => clearInterval(intervalId.current);

    useEffect(() => {
        start();

        return () => stop()
    }, []);

    useEffect(() => {
        if (offset) {
            if (offset % 4 === 0) {
                let item  = items[Math.floor(offset/4)];
                setItems([...items, item]);
            }
        }
    }, [offset]);

    return (
        <div 
            style={styles.root} 
            className='rd-horizontal-slider-smooth-root' 
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
        >
            <div style={styles.body} >
                <div style={styles.bodyInner} ref={bodyInnerRef}>
                    {/* {items} */}
                    {items.map((item, index) => {
                        return <span key={`smooth-carousel-${index}`}>{item}</span> 
                    })}
                </div>
            </div>
        </div>
    )
};

export default HorizontalCarouselSmooth;