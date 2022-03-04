import { Col, Input, Row, Space, Typography } from "antd";
import { FC } from "react";
import { FixLater } from "../../../../../schema/helper.interface";
import VisibilityIconButton from "./visibilityIcon.components";

interface PropsType {
    onClick: FixLater,
    visible: any,
    fieldName: string,
    data: any,
    value?: string
    label?: string
};

const styles = {
    row: {
        padding: '0 1rem'
    },
    root: {
        padding: '0 1.5rem',
        width: '100%',
    },
    col: {
        display: 'flex',
        alignItems: 'end'
    },
    inputGroup: {
        display: 'flex',
    },
    input: {
        color: 'rgba(255, 255, 255, 1)'
    }
} as const

const CheckoutInputField : FC<PropsType> = ({
    onClick,
    visible,
    fieldName,
    data,
    value=null,
    label=null
}) => {

    return (
        <Row gutter={6} style={styles.row}>
            <Col span={6} style={styles.col} >
                <Typography.Title level={5} >{label}</Typography.Title>
            </Col>
            <Col span={18} style={styles.col} >
                <Input.Group style={styles.inputGroup} compact>
                    
                    <Input 
                        type={visible[fieldName].status ? 'text' : 'password'}
                        disabled
                        size='large'
                        value={visible[fieldName].status ? (value || data[fieldName]) : '12345678'}
                        style={styles.input}
                    />  
                    <VisibilityIconButton 
                        visible={visible[fieldName].status}
                        onClick={(e: any) => onClick(fieldName)}
                    />
                </Input.Group>
            </Col>
        </Row>
    )
};

export default CheckoutInputField;