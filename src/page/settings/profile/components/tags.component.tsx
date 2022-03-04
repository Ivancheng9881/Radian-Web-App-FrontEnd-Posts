import { Input, Select, Space, Tag, Typography } from "antd";
import React, { FC, useEffect, useState } from "react";
import { SelectOptionType } from "../../../../schema/form/select.interface";
import { FixLater } from "../../../../schema/helper.interface";

interface PropsType {
    value: string[],
    disabled?: boolean,
    options: SelectOptionType[],
    onClose?: FixLater,
    onAdd?: FixLater,
};

const styles = {
    space: {
        width: '100%'
    },
    select: {
        width: '100%'
    },
    tag: {
        marginBottom: 5
    }
} as const

const EditProfileTags : FC<PropsType> = ({
    value=[], 
    disabled=true, 
    options=[],
    onAdd,
    onClose,
}) => {

    const [ keyword, setKeyword ] = useState<string>('');
    const [ filteredOptions, setFilteredOptions ] = useState<SelectOptionType[]>(options);

    const handleInputChange = (val: string) => {
        setKeyword('');
        onAdd(val)
    };

    const handleSearch = (val: string) => {
        let _filtered = options.filter((o) => o.value.includes(val));
        setKeyword(val);
        setFilteredOptions(_filtered);
    }

    useEffect(() => {
        setFilteredOptions(options);
    }, [options]);

    return (
        <Space direction="vertical" style={styles.space}>
            <Select
                showSearch
                style={styles.select}
                value={keyword}
                onChange={handleInputChange}
                disabled={disabled}
                showArrow={false}
                onSearch={handleSearch}
            >
                {filteredOptions.map((o) => {
                    return <Select.Option key={`SelectOptions:${o.value}`} value={o.value}>
                        {o.value}
                    </Select.Option>
                })}
            </Select>
            <div>
                {value && value?.map((v) => {
                    return (
                        <Tag 
                            style={styles.tag}
                            key={`tags:${v}`}
                            closable={!disabled}
                            onClose={e => onClose(v)}
                            >
                            {v}
                        </Tag>
                    )
                })}
            </div>
        </Space>
    )
};

export default EditProfileTags;