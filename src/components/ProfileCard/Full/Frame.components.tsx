import { FC } from "react";
import config from "../../../commons/config";

const styles = {
    root: { 
        height: '60vh', 
        minWidth: '400px', 
        minHeight: '480px',
        padding: `0.5rem 1rem`,
    },
    body: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: '0.5rem',
        backgroundColor: config.theme.backgroundLight
    }
} as const

const FullProfileFrame : FC = (props) => {

    return (
        <div style={styles.root}>
            <div style={styles.body} >
                {props.children}
            </div>
        </div>
    )
};

export default FullProfileFrame;