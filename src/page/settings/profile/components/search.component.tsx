import { Input } from "antd";
import { FC } from "react";

interface PropsType {
    value: string | number,
    disabled?: boolean,
    onChange: any,
};

const styles = {
    group: {
        display: 'flex'
    },
    input: {},
    icon: {},
} as const

const EditProfileInput : FC<PropsType> = ({
    value, 
    disabled=true,
    onChange,
}) => {

    return (
        <Input 
            size="large"
            value={value}
            disabled={disabled}
            onChange={onChange}
        />
    )
};

export default EditProfileInput;