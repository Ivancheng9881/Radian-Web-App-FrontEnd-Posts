import { Fragment, useContext, useEffect, useRef, useState } from "react";

const SliderThumb = (props) => {

    const {
        lower,
        upper,
        setLower,
        setUpper,
        max,
        min,
        handleMinChange,
        handleMaxChange,
        total,
        boundary
    } = props;

    const elem = useRef([null, null]); 
    const dragging = useRef(null);
    const direction = useRef(null);
    const lowerRef = useRef(lower);
    const upperRef = useRef(upper)

    let buttonSize = 24;
    let barHeight = 8;
    let thumbTextOffsetTop = -35;

    /**
     * useEffect 
     * binding event listener
     */
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            }
    }, [boundary]);

    /**
     * useEffect
     * handle update profile
     */
    useEffect(() => {
        handleMinChange(lower);
        lowerRef.current = lower;
        return () => {}
    }, [lower]);

    /**
     * useEffect
     * handle update profile
     */
    useEffect(() => {
        handleMaxChange(upper);
        upperRef.current = upper;
        return () => {}
    }, [upper])

    /**
     * handle action when mouse move
     * @param {event} e 
     */
    const handleMouseMove = (e) => {
        if (direction.current == 'upper') {
            // dragging upper thumb
            // newVal must be > lower and < max
            calculateDragUp(e, elem.current[1]);
        } else if (direction.current == 'lower') {
            // dragging lower thumb
            // newVal must be < upper and > min
            calculateDragDown(e, elem.current[0]);
        }
    };


    const calculateDragUp = (event, thumb,) => {
        // handle dragging
        if (dragging.current && event.pageX != thumb) {
            let newVal = Math.floor((event.pageX - boundary[1]) * 100 / boundary[0]);
            if (newVal >= max) {
                newVal = max - 1;
            } else if (newVal <= lowerRef.current) {
                newVal = lowerRef.current + 1;
            }
            setUpper(newVal);
        } 
    };


    const calculateDragDown = (event, thumb,) => {
        // handle dragging
        if (dragging.current && event.pageX != thumb) {
            let newVal = Math.floor((event.pageX - boundary[1]) * 100 / boundary[0]);
            if (newVal <= min) {
                newVal = min + 1;
            } else if (newVal >= upperRef.current) {
                newVal = upperRef.current - 1;
            }
            setLower(newVal);
        } 
    }

    const handleMouseUp = (e) => {
        dragging.current = false;
    }

    const handleMouseDown = (e, dir) => {
        e.preventDefault();
        direction.current = dir;
        if (dir == 'upper') {
            elem.current[1] = e.pageX;
        } else if (dir == 'lower') {
            elem.current[0] = e.pageX;
        }
        dragging.current = true;
    };


    return (
        <Fragment>
            <span 
                id='RD-DoubleSlider-LowerController'
                className="absolute bg-theme-light-blue"
                style={{
                    height: buttonSize,
                    width: buttonSize,
                    top: (barHeight - buttonSize) / 2,
                    borderRadius: buttonSize / 2,
                    left: `calc(${lower * 100 / total}% - ${buttonSize / 2}px)`
                }}
                onMouseDown={e => handleMouseDown(e, 'lower')}
            >
                <span className="relative">
                    <span 
                        className="absolute text-theme-white text-xl" 
                        style={{
                            top: thumbTextOffsetTop,
                        }}
                    >
                        {lowerRef.current}
                    </span>
                </span>
            </span>
            <span 
                id='RD-DoubleSlider-UpperController'
                className="absolute bg-theme-light-blue"
                style={{
                    height: buttonSize,
                    width: buttonSize,
                    top: (barHeight - buttonSize) / 2,
                    borderRadius: buttonSize / 2,
                    left: `calc(${upper * 100 / total}% - ${buttonSize / 2}px)`
                }}
                onMouseDown={e => handleMouseDown(e, 'upper')}
            >
                <span className="relative">
                    <span 
                        className="absolute text-theme-white text-xl" 
                        style={{
                            top: thumbTextOffsetTop,
                        }}
                    >
                        {upperRef.current}
                    </span>
                </span>
            </span>
        </Fragment>
    )
};

export default SliderThumb;