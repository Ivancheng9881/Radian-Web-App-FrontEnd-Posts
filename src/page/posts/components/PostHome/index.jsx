import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { FC, useEffect, useState, useContext } from "react";
import config from "../../../../commons/config";
import ipfsUtils from "../../../../utils/web3/ipfs/ipfs.utils";
import { motion } from "framer-motion";
import { ArrowLeftOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { Image, Input } from "antd";
import UserContext from "../../../../utils/user/context/user.context";
import PostsSection from "../PostsSection";
import { useInView } from "react-cool-inview";

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
  query Query(
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
      meta {
        count
      }
    }
  }
`;

const PostHome = () => {
  const [posts, setPosts] = useState([]);
  const [groupId, setGroupId] = useState(1);
  const [level, setLevel] = useState(0);
  const [refId, setRefId] = useState(null);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const [postCount, setPostCount] = useState(0);
  const [isFetchMoreLoading, setIsFetchMoreLoading] = useState(false);

  useEffect(() => {
    if (posts) {
      console.log(posts);
    }
  }, [posts]);

  const { loading, error, fetchMore } = useQuery(POST_HOME_QUERY, {
    variables: { groupId, level, refId, skip, limit },
    onCompleted: (queryData) => {
      const { data, meta } = queryData.postList;
      setPosts(data);
      setPostCount(meta.count);
    },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  const handleChange = () => {
    if (skip < postCount) {
      setTimeout(() => {
        FetchMorePosts();
      }, 300);
      return;
    }
  };

  const FetchMorePosts = async () => {
    setSkip((prev) => prev + limit);

    const fetchedMore = await fetchMore({
      variables: { groupId, level, refId, skip, limit },
    });

    const { data } = fetchedMore.postList;
    setPosts((previousData) => [...previousData, ...data]);
    setIsFetchMoreLoading(false);
  };

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
        {posts.map((object) => (
          <PostsSection key={object.postId} postData={object} />
        ))}
      </div>
      <button onClick={handleChange}>load more</button>
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
