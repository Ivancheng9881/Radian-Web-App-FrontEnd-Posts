import { Typography } from "antd";
import { FC } from "react";

interface PropsType {
    
}

const EditProfileLabel : FC<PropsType> = (props) => {
    return (
        <Typography.Title level={4}>
            {props.children}
        </Typography.Title>
    )
};

export default EditProfileLabel;