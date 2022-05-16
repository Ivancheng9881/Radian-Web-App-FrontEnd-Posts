import { Comment, List } from "antd";
import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import NestedComments from "../CommentSection/NestedComments";

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

const COMMENT_DATA_QUERY = gql`
  query PostList($level: Int, $refId: Int, $groupId: Int) {
    postList(level: $level, refId: $refId, groupId: $groupId) {
      data {
        postId
        content
        referenceId
        level
        createdBy
        creatorIdentityId
        groupId
        noOfComments
        createdAt
      }
    }
  }
`;

const LevelOneComments = (props) => {
  const { loading, error, data } = useQuery(COMMENT_DATA_QUERY, {
    variables: { level: 1, refId: 1601, groupId: 1 },
  });

  if (loading) return null;
  if (error) return "Error!";
  if (data) console.log(Object.keys(data.postList.data));

  const colorzzz = () => {
    return Math.floor(Math.random() * 16777215).toString(16);
  };

  return (
    <>
      <List
        className="comment-list"
        header={`${data.postList.data.length} replies`}
        itemLayout="horizontal"
        dataSource={data.postList.data}
        renderItem={(item) => (
          <li>
            <Wrapper style={{ backgroundColor: "#" + `${colorzzz()}` }}>
              <StyledContainer fluid>
                <Comment
                  actions={[
                    <span key="comment-list-reply-to-0">Reply to</span>,
                  ]}
                  author={item.createdBy}
                  avatar="https://joeschmoe.io/api/v1/random"
                  content={item.content}
                  datetime={item.createdAt}
                />
                <div className="rd-nested-comments-container">
                  <NestedComments referenceId={item.postId} />
                </div>
              </StyledContainer>
            </Wrapper>
          </li>
        )}
      />
    </>
  );
};

export default LevelOneComments;
