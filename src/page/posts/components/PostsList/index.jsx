import PostsSection from "../PostsSection/index";
import { ArrowLeftOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { gql, useQuery } from "@apollo/client";
import LevelOneComments from "../CommentSection/LevelOneComments";
import PostComment from "../PostComment/index";
import { motion } from "framer-motion";
import { useEffect } from "react";

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

const PostsList = (props) => {
  useEffect(() => {
    if (props) {
      console.log(props.postData.object.postId);
    }
  }, []);
  // const { loading, error, data } = useQuery(POST_DATA_QUERY, {
  //   variables: { groupId: 1, level: 0, refId: null, limit: 1 },
  // });

  // if (loading) return null;
  // if (error) return error;
  // if (data) console.log("og data");

  return (
    <div>
      <PostsSection postData={props.postData.object} />
      {props.postData.object.noOfComments > 0 && (
        <LevelOneComments
          amountOfComments={props.postData.object.noOfComments}
        />
      )}
      <PostComment />
    </div>
  );
};

export default PostsList;
