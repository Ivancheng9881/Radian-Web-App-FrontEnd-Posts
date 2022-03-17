import { Typography } from "antd";
import { FC } from "react";
import RadianPassportCommon from "./common";
import { CardFrameProps } from "./interface";


const RadianPassportFront : FC<CardFrameProps> = ({
    onClick,
    profile
}) => {

    const { styles } = RadianPassportCommon;

    return (
        <div style={{...styles.front, ...styles.cardFrame}} onClick={onClick}>
            <div>
                <Typography.Title style={{...styles.textPrimary}}>
                    {profile.firstName} {profile.lastName}
                </Typography.Title>
            </div>
        </div>
    )
};

export default RadianPassportFront;