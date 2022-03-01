import { Button, Col, Row } from "antd";
import { FC } from "react";
import { FixLater } from "../../../../schema/helper.interface";

interface PropsType {
    disabled: boolean,
    clickPrimary: FixLater,
}

const styles = {
    button: {
        width: '100%'
    }
}

const EditProfileButtonGroup : FC<PropsType> = ({
    disabled,
    clickPrimary,
}) => {
    return (
        <Row justify="end" gutter={24}>
            <Col span={6}>
                <Button
                    color="secondary"
                    shape="round"
                    onClick={clickPrimary}
                    style={styles.button}
                    disabled={disabled}
                >
                    Cancel
                </Button>
            </Col>
            <Col span={6}>
                <Button
                    type="primary"
                    shape="round"
                    onClick={clickPrimary}
                    style={styles.button}
                >
                    { disabled ? 'Edit' : 'Confirm'}
                </Button>
            </Col>
        </Row>
    )
};

export default EditProfileButtonGroup;