import PostsSection from "../PostsSection/index";
import { ArrowLeftOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { gql, useQuery } from "@apollo/client";
import LevelOneComments from "../CommentSection/LevelOneComments";
import PostComment from "../PostComment/index";
import { BackTop } from "antd";
import { motion } from "framer-motion";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

const ScrollToTopBtn = () => {
  return (
    <motion.button
      className="rd-scroll-top-btn"
      whileHover={{ scale: 1.4 }}
      whileTap={{ scale: 0.9 }}
    >
      <VerticalAlignTopOutlined
        style={{ fontSize: "23px", color: "#8e94ff" }}
      ></VerticalAlignTopOutlined>
    </motion.button>
  );
};
const BackBtn = () => {
  return (
    <motion.button
      className="rd-scroll-top-btn"
      whileHover={{ scale: 1.4 }}
      whileTap={{ scale: 0.9 }}
    >
      <ArrowLeftOutlined style={{ fontSize: "25px", color: "#8e94ff" }} />
    </motion.button>
  );
};

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
        <BackBtn />
        <ScrollToTopBtn />
      </div>
      <div className="rd-post-list-wrapper">
        <BackTop />
        <div>
          <PostsSection postData={data.postList.data[0]} />
        </div>

        {data.postList.data[0].noOfComments > 0 && (
          <LevelOneComments
            amountOfComments={data.postList.data[0].noOfComments}
          />
        )}
      </div>
      <div className="rd-post-comment-container">
        <PostComment />
      </div>
    </div>
  );
};

export default PostsList;
