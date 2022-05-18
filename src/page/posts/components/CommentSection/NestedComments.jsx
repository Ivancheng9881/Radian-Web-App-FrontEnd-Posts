import { Comment, Tooltip, List } from "antd";
import { gql, useQuery } from "@apollo/client";
import { useState, useEfffect } from "react";
import ModalComment from "./ModalComment";

const NESTED_COMMENTS_QUERY = gql`
  query Query($groupId: Int, $level: Int, $refId: Int) {
    postList(groupId: $groupId, level: $level, refId: $refId) {
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

const NestedComments = (props) => {
  const [expand, setExpand] = useState(false);

  const { loading, error, data } = useQuery(NESTED_COMMENTS_QUERY, {
    variables: { level: 2, refId: props.referenceId, groupId: 1 },
  });

  if (loading) return null;
  if (error) return "ERROR!";
  if (data) console.log(data);

  const handleExpand = () => {
    setExpand(!expand);
    return console.log(expand);
  };

  return (
    <List
      className="comment-list"
      header={
        <Tooltip placement="right" title="Click to view comments">
          <button onClick={handleExpand}>
            {data.postList.data.length} replies
          </button>
        </Tooltip>
      }
      itemLayout="horizontal"
      dataSource={data.postList.data}
      renderItem={(item) => (
        <li>
          {expand && (
            <Comment
              actions={[
                <ModalComment refId={item.createdBy}>
                  <span key="comment-nested-reply-to">
                    Reply to {item.createdBy}
                  </span>
                </ModalComment>,
              ]}
              author={item.createdBy}
              avatar="https://joeschmoe.io/api/v1/random"
              content={item.content}
              datetime={item.createdAt}
            />
          )}
        </li>
      )}
    />
  );
};

export default NestedComments;
