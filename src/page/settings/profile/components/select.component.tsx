import { Input, Select } from "antd";
import { FC } from "react";
import { SelectOptionType } from "../../../../schema/form/select.interface";
import { FixLater } from "../../../../schema/helper.interface";

interface PropsType {
    value: string | number,
    disabled?: boolean,
    options: SelectOptionType[],
    onChange: FixLater,
};

const styles = {
    select: {
        width: '100%'
    },
} as const

const EditProfileSelect : FC<PropsType> = ({
    value, 
    disabled=true, 
    options=[],
    onChange,
}) => {

    return (
        <Select 
            style={styles.select}
            size="large"
            value={value}
            disabled={disabled}
            onChange={onChange}
        >
            {options?.map((o: SelectOptionType) => {
                return <Select.Option key={`SelectOptions:${o.value}`} value={o.value}>{o.label}</Select.Option> 
            })}
        </Select>
    )
};

export default EditProfileSelect;