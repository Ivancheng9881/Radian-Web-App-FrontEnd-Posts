import { FC } from "react"
import { Scrollbars } from 'react-custom-scrollbars';

interface CustomScrollBarProps {
    height: number,
    horizontalScroll?: boolean
}

const CustomScrollbar : FC<CustomScrollBarProps> = (props) => {
    const { 
        children,
        height,
        horizontalScroll=false
    } = props;

    return (
        <Scrollbars 
            style={{height: height}} 
            renderTrackHorizontal={props => <div style={{display: 'none'}}></div>}
        >
            {children}
        </Scrollbars>
    )
};

export default CustomScrollbar;