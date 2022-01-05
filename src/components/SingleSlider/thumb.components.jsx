import { Fragment, useEffect, useRef } from "react";

const SliderThumb = (props) => {

    const {
        upper,
        setUpper,
        max,
        min,
        handleMaxChange,
        total,
        boundary,
        unit=''
    } = props;

    const elem = useRef([null, null]); 
    const dragging = useRef(null);
    const direction = useRef(false);
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
        handleMaxChange(upper);
        upperRef.current = upper;
        return () => {}
    }, [upper])

    /**
     * handle action when mouse move
     * @param {event} e 
     */
    const handleMouseMove = (e) => {
        if (direction.current) {
            // dragging upper thumb
            calculateDragUp(e, elem.current[1]);
        }
    };


    const calculateDragUp = (event, thumb,) => {
        // handle dragging
        if (dragging.current && event.pageX != thumb) {
            let newVal = Math.floor((event.pageX - boundary[1]) * 100 / boundary[0]);
            if (newVal > max) {
                newVal = max;
            } else if (newVal < min) {
                newVal = min;
            }
            setUpper(newVal);
        } 
    };


    const handleMouseUp = (e) => {
        dragging.current = false;
    }

    const handleMouseDown = (e) => {
        e.preventDefault();
        direction.current = true;
        elem.current[1] = e.pageX;
        dragging.current = true;
    };


    return (
        <Fragment>
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
                onMouseDown={e => handleMouseDown(e)}
            >
                <span className="relative">
                    <span 
                        className="absolute text-theme-white text-xl w-max" 
                        style={{
                            top: thumbTextOffsetTop,
                            left: -10
                        }}
                    >
                        {`${upperRef.current} ${unit}`}
                    </span>
                </span>
            </span>
        </Fragment>
    )
};

export default SliderThumb;