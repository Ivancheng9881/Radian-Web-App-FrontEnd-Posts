import { Button, Col, Row } from "antd";
import { FC } from "react";
import { FixLater } from "../../../../schema/helper.interface";

interface PropsType {
    disabled: boolean,
    setDisabled: FixLater,
    handleConfirm: FixLater,
}

const styles = {
    button: {
        width: '100%'
    }
}

const EditProfileButtonGroup : FC<PropsType> = ({
    disabled,
    setDisabled,
    handleConfirm
}) => {

    const toggleDisable = () => {
        setDisabled(!disabled);
    };

    return (
        <Row justify="end" gutter={24}>
            {
                disabled 
                ? <Col span={6}>
                    <Button
                        type="primary"
                        shape="round"
                        onClick={toggleDisable}
                        style={styles.button}
                    >
                        Edit
                    </Button>
                </Col>
                : <>
                    <Col span={6}>
                        <Button
                            color="secondary"
                            shape="round"
                            onClick={toggleDisable}
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
                            onClick={handleConfirm}
                            style={styles.button}
                        >
                            Confirm
                        </Button>
                    </Col>
                </>
            }
        </Row>
    )
};

export default EditProfileButtonGroup;