import { Comment, Avatar, Form, Button, List, Input } from "antd";
import moment from "moment";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";

const { TextArea } = Input;

const StyledContainer = styled(Container)`
  background-color: white;
  padding-top: 25px;
  padding-left: 45px;
  padding-right: 35px;
  padding-bottom: 25px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled.div`
  padding-left: 10px;
  position: relative;
  margin-bottom: 10px;
`;

const colorzzz = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
};

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props) => (
      <Wrapper style={{ backgroundColor: "#" + `${colorzzz()}` }}>
        <StyledContainer fluid>
          <Comment {...props} />
        </StyledContainer>
      </Wrapper>
    )}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <div className="rd-post-comment-container">
      <Form.Item>
        <TextArea
          className="rd-reply-input"
          rows={1}
          allowClear
          autoSize
          showCount
          onChange={onChange}
          value={value}
          placeHolder={"Reply to......"}
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          Add Comment
        </Button>
      </Form.Item>
    </div>
  </>
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
    <>
      <div id="rd-post-comment-container">
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
    </>
  );
};

export default PostComment;
