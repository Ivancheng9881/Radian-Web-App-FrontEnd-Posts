import { Comment, Avatar, Form, Button, List, Input } from "antd";
import moment from "moment";
import { useState, useEffect } from "react";
import { SendOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const colorzzz = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
};

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props) => (
      <div
        className="rd-post-color-container"
        style={{ backgroundColor: "#" + `${colorzzz()}` }}
      >
        <div className="rd-post-color-inner-wrapper">
          <Comment {...props} />
        </div>
      </div>
    )}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div className="rd-post-comment-wrapper">
    <div className="rd-post-text-input">
      <Form.Item>
        <TextArea
          rows={1}
          autoSize
          allowClear
          showCount
          onChange={onChange}
          value={value}
          placeHolder={"Reply to......"}
        />
      </Form.Item>
    </div>
    <div className="rd-post-comment-send-button">
      <Form.Item>
        <SendOutlined
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
          style={{ fontSize: "20px", color: `#5829E3` }}
        />
      </Form.Item>
    </div>
  </div>
);

const PostComment = () => {
  const [state, setState] = useState({
    comments: [],
    submitting: false,
    value: "",
  });

  const handleSubmit = () => {
    if (!state.value) {
      return;
    }

    setState({
      ...state,
      submitting: true,
    });

    setTimeout(() => {
      setState({
        submitting: false,
        value: "",
        comments: [
          ...state.comments,
          {
            author: "Han Solo",
            avatar: "https://joeschmoe.io/api/v1/random",
            content: <p>{state.value}</p>,
            datetime: moment().fromNow(),
            actions: [<span key="comment-list-reply-to-0">Reply to</span>],
          },
        ],
      });
    }, 1000);
  };

  const handleChange = (e) => {
    setState({
      ...state,
      value: e.target.value,
    });
  };

  return (
    <div>
      {state.comments.length > 0 && <CommentList comments={state.comments} />}

      <Comment
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={state.submitting}
            value={state.value}
          />
        }
      />
    </div>
  );
};

export default PostComment;
