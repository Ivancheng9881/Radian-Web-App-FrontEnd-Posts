import { gql, useQuery } from "@apollo/client";
import { FC, useEffect, useState, useContext } from "react";
import config from "../../../../commons/config";
import ipfsUtils from "../../../../utils/web3/ipfs/ipfs.utils";
import { motion } from "framer-motion";
import { ArrowLeftOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { Image, Input } from "antd";
import UserContext from "../../../../utils/user/context/user.context";
import PostsSection from "../PostsSection";
import InfiniteScroll from "react-infinite-scroll-component";

const { TextArea } = Input;

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

const POST_HOME_QUERY = gql`
  query PostList($groupId: Int, $level: Int, $refId: Int, $limit: Int) {
    postList(groupId: $groupId, level: $level, refId: $refId, limit: $limit) {
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

const MORE_POST_QUERY = gql`
  query PostList(
    $groupId: Int
    $level: Int
    $refId: Int
    $skip: Int
    $limit: Int
  ) {
    postList(
      groupId: $groupId
      level: $level
      refId: $refId
      skip: $skip
      limit: $limit
    ) {
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

const executeMorePosts = () => {
  
}

const PostHome = () => {
  // const { profile } = useContext(UserContext);
  // const [getPosts, setGetPosts] = useState([]);

  // useEffect(() => {
  //   if(data) {
  //     setGetPosts(data.postList.data)
  //   }
  // }, []);

  // const [imgList, setImgList] = useState<string[]>([]);

  // useEffect(() => {
  //   if (profile?.profilePictureCid?.length > 0) {
  //     setImgList(
  //       ipfsUtils.getImageFromCDNFailover(profile.profilePictureCid[0])
  //     );
  //   }
  // }, [profile?.profilePictureCid]);

  // useEffect(() => {
  //   if (profile) {
  //     console.log(profile.nationality);
  //   }
  // });
  const [items, setItems] = useState(5);
  const { loading, error, data } = useQuery(POST_HOME_QUERY, {
    variables: { groupId: 1, level: 0, refId: null, limit: 5 },
  });

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;
  if (!data) return <p>No Data</p>;

  // fetchMoreData = () => {

  // }

  return (
    <div className="rd-post-section-home-wrapper">
      <div className="rd-post-list-wrapper-header">
        <BackBtn />
        <ScrollToTopBtn />
      </div>
      <div className="rd-post-home-comment">
        <TextArea
          rows={5}
          style={{ backgroundColor: "rgba(256, 256, 256, 0.7)" }}
        ></TextArea>
      </div>
      <div className="rd-post-list-home-wrapper">
        {data.postList.data.map((object) => (
          <PostsSection key={object.postId} postData={object} />
        ))}
      </div>
    </div>
  );
};

export default PostHome;

// <Image
// src={imgList.length > 0 && imgList[0]}
// fallback={imgList.length > 0 && imgList[1]}
// placeholder={
//   <img
//     src={`${config.assets.cdn}/misc/propic_placeholder.png`}
//     alt="avatar pic lul"
//   />
// }
// preview={false}
// />
