import { Select, SelectProps, Tag } from "antd";
import { FC } from "react";


const CustomTagSelect : FC<SelectProps> = (props) => {
    console.log(props.options)
    return (
        <Select 
            className="rd-input-root" 
            {...props}
            mode="multiple"
        >
            {
                props.options.map((opt) => {
                    return <Select.Option key={`select-option-${opt.label}`}>
                        <Tag className="rd-content-tag">
                            {opt.label}
                        </Tag>
                    </Select.Option>
                })
            }
        </Select>
    )
};

export default CustomTagSelect;