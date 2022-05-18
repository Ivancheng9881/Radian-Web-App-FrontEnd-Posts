import { Modal, Input } from "antd";
import { useState, useEffect } from "react";

const { TextArea } = Input;

const onChange = (e) => {
  console.log("Change:", e.target.value);
};

const ModalComment = (props) => {
  const [visible, setVisible] = useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };

  return (
    <>
      <button onClick={handleChange}>Reply to</button>
      <Modal
        title={"Reply to " + `${props.refId}`}
        centered
        visible={visible}
        onOk={handleChange}
        onCancel={handleChange}
        bodyStyle={{ padding: 0 }}
        keyboard={true}
        okText="Send"
      >
        <TextArea
          showCount
          maxLength={400}
          style={{ height: 120 }}
          onChange={onChange}
        />
      </Modal>
    </>
  );
};

export default ModalComment;
