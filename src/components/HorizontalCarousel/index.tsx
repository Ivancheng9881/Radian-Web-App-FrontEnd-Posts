import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState, FC, useEffect, useRef, useLayoutEffect, memo } from "react";
import { clearInterval } from "timers";
import { StyleSheet } from "../../schema/helper.interface";

interface PageProps {
    itemWidth: number,
    itemPadding?: number,
    iconSize?: number,
    iconMargin?: number,
    count: number,
    fetchDataCallback?: () => Promise<void>,
    fetchBuffer?: number,
    autoScroll?: boolean
}

const HorizontalCarousel : FC<PageProps> = ({
    children,
    itemWidth,
    itemPadding=10,
    iconSize=30,
    iconMargin=10,
    count,
    fetchDataCallback,
    fetchBuffer=5,
    autoScroll=false
}) => {

    const [ offset, setOffset ] = useState(0);
    const [ buffering, setBuffering ] = useState(false);
    const bodyInnerRef = useRef(null);

    useEffect(() => {
        setBuffering(false);
    }, [count]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            handleNext();
        }, 10);

        return () => {
            clearInterval(intervalId)
        }
    }, [autoScroll]);

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
            width: 'calc(100% - 30px)',
            overflow: 'hidden',
        },
        bodyInner: {
            width: '100%',
            display: 'flex',
            marginLeft: `${-(itemWidth + itemPadding * 2) * offset}px`,
            transition: `0.3s`
        },
        itemWrapper: {
            padding: `0px ${itemPadding}px`
        },
        button: {
            width: `${iconSize}px`
        },
    };

    const handlePrev = () => {
        setOffset((prevState) => {
            prevState--
            return prevState
        });
    }

    const handleNext = () => {
        setOffset((prevState) => {
            if (shouldUpdateOffset(prevState)) return prevState;

            prevState++;
            if (prevState + fetchBuffer > count && !buffering) {
                setBuffering(true)
                fetchDataCallback && fetchDataCallback();
            };

            return prevState
        });
    };

    const shouldUpdateOffset = (val: number) => count < Math.floor(bodyInnerRef.current?.offsetWidth / itemWidth) + val;

    const shouldNextDisabled = shouldUpdateOffset(offset);

    return (
        <div style={styles.root}>
            {/* left control */}
            <div style={styles.controller}>
                <Button 
                    shape="circle" 
                    style={styles.button} 
                    type="default" 
                    disabled={offset <=  0}
                    icon={<CaretLeftOutlined className="rd-icon rd-icon-purple" />} 
                    onClick={handlePrev}
                />
            </div>

            {/* children */}
            <div style={styles.body} >
                <div style={styles.bodyInner} ref={bodyInnerRef}>
                    {children}
                </div>
            </div>

            {/* right control */}
            <div style={styles.controller}>
                <Button 
                    type="default" 
                    style={styles.button} 
                    shape="circle" 
                    icon={<CaretRightOutlined className="rd-icon rd-icon-purple" />} 
                    onClick={handleNext}
                    disabled={shouldNextDisabled}
                />
            </div>
        </div>
    )
};

export default HorizontalCarousel;