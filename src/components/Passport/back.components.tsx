import { FC } from "react";
import RadianPassportCommon from "./common";
import { CardFrameProps } from "./interface";

const RadianPassportBack : FC<CardFrameProps> = ({
    onClick,
    profile,
}) => {

    const { styles } = RadianPassportCommon;

    return (
        <div style={{...styles.back, ...styles.cardFrame}} onClick={onClick}>


        </div>
    )
};

export default RadianPassportBack;