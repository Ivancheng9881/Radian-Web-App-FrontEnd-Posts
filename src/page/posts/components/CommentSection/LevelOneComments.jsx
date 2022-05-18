import { Comment, List } from "antd";
import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import NestedComments from "../CommentSection/NestedComments";
import { set } from "@project-serum/anchor/dist/cjs/utils/features";
import ModalComponent from "./ModalComment";
import PostComment from "../PostComment";



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
        // header={`${props.amountOfComments}` + ` replies`}
        itemLayout="horizontal"
        dataSource={data.postList.data}
        renderItem={(item) => (
          <li>
            <div
              className="rd-post-color-container-level-one"
              style={{ backgroundColor: "#" + `${colorzzz()}` }}
            >
              <div className="rd-post-color-inner-wrapper">
                <Comment
                  actions={[<ModalComponent refId={item.createdBy} />]}
                  author={item.createdBy}
                  avatar="https://joeschmoe.io/api/v1/random"
                  content={item.content}
                  datetime={item.createdAt}
                />
                <div className="rd-nested-comments-container">
                  {props.amountOfComments > 0 && (
                    <NestedComments referenceId={item.postId} />
                  )}
                </div>
              </div>
            </div>
          </li>
        )}
      />
    </>
  );
};

export default LevelOneComments;
