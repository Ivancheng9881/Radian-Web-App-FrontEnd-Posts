import { FC } from "react";
import { Input, InputProps } from "antd";

const CustomInput : FC<InputProps> = (props) => {
    return (
        <Input className="rd-input-root" {...props} />
    )
};

export default CustomInput;