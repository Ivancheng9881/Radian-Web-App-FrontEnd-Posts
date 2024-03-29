import { useEffect, useState } from "react";
import SliderThumb from "./thumb.components";

const DoubleSlider = (props) => {

    const {
        max,
        min,
    } = props;

 
    const [ lower, setLower ] = useState(props.lower);
    const [ upper, setUpper ] = useState(props.upper);
    const [ boundary, setBoundary ] = useState([0, 0]) // represent [w, x1, x2]
    let total = 100;

    useEffect(() => {
        calcBoundary();
    }, []);

    const calcBoundary = () => {
        let elem = document.getElementById('RD-DoubleSlider-FullBar');
        let rect = elem.getBoundingClientRect();
        setBoundary([rect.width, rect.x, rect.x + rect.width]);
    }


    return (
        <div id='RD-DoubleSlider' className="w-full h-0.5">
            <span 
                id='RD-DoubleSlider-BarRoot'
                className='inline-block relative w-full h-full'
            >
                <span 
                    id='RD-DoubleSlider-FullBar'
                    className="bg-theme-dark-blue w-full h-full block absolute"
                />
                <span 
                    id='RD-DoubleSlider-SelectedBar'
                    className={`bg-theme-light-blue w-1/2 h-full block absolute`}  
                    style={{
                        left: `${lower * 100 / total}%`,
                        width: `${(upper - lower) * 100 / total}%`
                    }}             
                />
                <SliderThumb 
                    total={total}
                    boundary={boundary}
                    {...props}
                    lower={lower}
                    setLower={setLower}
                    upper={upper}
                    setUpper={setUpper}
                />
            </span>

        </div>
    )
};

export default DoubleSlider;