import PostsSection from "../PostsSection/index";
import { ArrowLeftOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { gql, useQuery } from "@apollo/client";
import LevelOneComments from "../CommentSection/LevelOneComments";
import PostComment from "../PostComment/index";

import { BackTop } from "antd";

const POST_DATA_QUERY = gql`
  query Query($groupId: Int, $level: Int, $refId: Int, $limit: Int) {
    postList(groupId: $groupId, level: $level, refId: $refId, limit: $limit) {
      data {
        postId
        content
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

const PostsList = () => {
  const { loading, error, data } = useQuery(POST_DATA_QUERY, {
    variables: { groupId: 1, level: 0, refId: null, limit: 1 },
  });

  if (loading) return null;
  if (error) return error;
  if (data) console.log(data);

  return (
    <div className="rd-post-section-wrapper">
      <div className="rd-post-list-wrapper-header">
        <ArrowLeftOutlined style={{ fontSize: "23px", color: "#8e94ff" }} />
        <button className="rd-scroll-top-btn">
          <VerticalAlignTopOutlined
            style={{ fontSize: "23px", color: "#8e94ff" }}
          ></VerticalAlignTopOutlined>
        </button>
      </div>
      <div className="rd-post-list-wrapper">
        <div>
          <PostsSection postData={data.postList.data[0]} />
        </div>

        {data.postList.data[0].noOfComments > 0 && (
          <LevelOneComments
            amountOfComments={data.postList.data[0].noOfComments}
          />
        )}
        {data.postList.data[0].noOfComments > 0 && (
          <LevelOneComments
            amountOfComments={data.postList.data[0].noOfComments}
          />
        )}
        {data.postList.data[0].noOfComments > 0 && (
          <LevelOneComments
            amountOfComments={data.postList.data[0].noOfComments}
          />
        )}
        {data.postList.data[0].noOfComments > 0 && (
          <LevelOneComments
            amountOfComments={data.postList.data[0].noOfComments}
          />
        )}
      </div>
      <div className="rd-post-comment-container">
        <PostComment />
      </div>
      <BackTop />

    </div>
  );
};

export default PostsList;
