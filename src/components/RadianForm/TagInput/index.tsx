import { Select, SelectProps, Tag } from "antd";
import { FC } from "react";


const CustomTagSelect : FC<SelectProps> = (props) => {

    return (
        <Select 
            className="rd-input-root" 
            {...props}
            mode="tags"
            tokenSeparators={[',']}
        >
            {
                props.value.map((opt: string) => {
                    return <Select.Option key={`select-option-${opt}`}>
                        <Tag className="rd-content-tag">
                            {opt}
                        </Tag>
                    </Select.Option>
                })
            }
        </Select>
    )
};

export default CustomTagSelect;