import { Comment, Tooltip, List } from "antd";
import { gql, useQuery } from "@apollo/client";



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
  const { loading, error, data } = useQuery(NESTED_COMMENTS_QUERY, {
    variables: { level: 2, refId: props.referenceId, groupId: 1 },
  });

  if (loading) return null;
  if (error) return "ERROR!";
  if (data) console.log(data);

  return (
    <List
      className="comment-list"
      header={`${data.postList.data.length} replies`}
      itemLayout="horizontal"
      dataSource={data.postList.data}
      renderItem={(item) => (
        <li>
          <Comment
            actions={[<span key="comment-nested-reply-to">Reply to</span>]}
            author={item.createdBy}
            avatar="https://joeschmoe.io/api/v1/random"
            content={item.content}
            datetime={item.createdAt}
          />
        </li>
      )}
    />
  );
};

export default NestedComments;
