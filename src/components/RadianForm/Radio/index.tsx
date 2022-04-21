import { Radio, RadioGroupProps } from "antd"
import { FC } from "react"

const CustomRadio : FC<RadioGroupProps> = (props) => {
    return (
        <Radio.Group 
            className="rd-radio-root" 
            buttonStyle="solid"
            optionType="button"
            {...props} 
        />
    )
};

export default CustomRadio;