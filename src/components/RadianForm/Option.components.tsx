import { FC } from "react";
import { Select, SelectProps } from "antd";

const CustomSelect : FC<SelectProps> = (props) => {
    return (
        <Select className="rd-input-root" {...props} >
            {props.children}
        </Select>
    )
};

export default CustomSelect;