import { gql, useQuery, useLazyQuery } from "@apollo/client";
import {
  FC,
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef,
} from "react";
import { useHistory } from "react-router-dom";
import config from "../../../../commons/config";
import ipfsUtils from "../../../../utils/web3/ipfs/ipfs.utils";
import { motion } from "framer-motion";
import { ArrowLeftOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { Image, Input } from "antd";
import UserContext from "../../../../utils/user/context/user.context";
import PostsSection from "../PostsSection";
import { useInView } from "react-cool-inview";
import { Avatar, Divider, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { set } from "@project-serum/anchor/dist/cjs/utils/features";
import PostList from "../PostsList/index";

const { TextArea } = Input;

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
  const DEFAULT_LIMIT = 5;
  const [posts, setPosts] = useState([]);
  const [groupId, setGroupId] = useState(1);
  const [level, setLevel] = useState(0);
  const [refId, setRefId] = useState(null);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const [postCount, setPostCount] = useState(0);
  const [isFetchMoreLoading, setIsFetchMoreLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(false);
  const [clickedPost, setClickedPost] = useState({});
  const [toggleHomePage, setToggleHomePage] = useState(true);

  const myRef = useRef(null);

  const { loading, error, data, fetchMore } = useQuery(POST_HOME_QUERY, {
    variables: {
      groupId: 1,
      level: 0,
      refId: null,
      skip: 0,
      limit: DEFAULT_LIMIT,
    },
    onCompleted: (queryData) => {
      const { data, meta } = queryData.postList;
      console.log("kirby");
      setPosts(data);
      setPostCount(meta.count);
      setSkip((prev) => prev + limit);
    },
  });

  const ScrollToTopBtn = () => {
    return (
      <motion.button
        className="rd-scroll-top-btn"
        whileHover={{ scale: 1.4 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleScrollToTop}
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
        onClick={handleBack}
      >
        <ArrowLeftOutlined style={{ fontSize: "25px", color: "#8e94ff" }} />
      </motion.button>
    );
  };

  useEffect(() => {
    if (skip < postCount) {
      setHasMorePosts(true);
    } else {
      setHasMorePosts(false);
    }
  }, [skip, postCount]);

  const handleScrollToTop = () => {
    myRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleChange = () => {
    if (skip >= postCount) {
    } else {
      FetchMorePosts();
    }
  };

  const handleClicked = (selectedPost) => {
    console.log(selectedPost);
    setClickedPost(selectedPost);
    setToggleHomePage(false);
  };

  const handleBack = () => {
    setToggleHomePage(true);
  };

  const FetchMorePosts = async () => {
    const fetchedMore = await fetchMore({
      variables: { groupId, level, refId, skip, limit },
    });

    const { data } = fetchedMore.data.postList;

    setPosts((previousData) => [...previousData, ...data]);
    setSkip((prev) => prev + limit);
  };

  return (
    <div
      id="rd-post-section-home-wrapper"
      style={{ overflow: "scroll", height: 800 }}
    >
      <div className="rd-post-list-wrapper-header">
        <BackBtn />
        <ScrollToTopBtn />
      </div>

      <div className="rd-post-home-comment">
        {toggleHomePage && (
          <TextArea
            rows={5}
            style={{ backgroundColor: "rgba(256, 256, 256, 0.7)" }}
          />
        )}
      </div>
      <div id="rd-infinite-scroll-post">
        <InfiniteScroll
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          dataLength={posts.length - 1}
          next={handleChange}
          hasMore={true}
          scrollableTarget={"rd-infinite-scroll-post"}
          // loader={
          //   <Skeleton
          //     avatar
          //     paragraph={{
          //       rows: 2,
          //     }}
          //     active
          //   />
          // }
        >
          <div ref={myRef}></div>
          {toggleHomePage ? (
            <div className="rd-post-list-home-wrapper">
              {posts.map((object, idx) => (
                <li key={idx} style={{ listStyle: "none" }}>
                  <PostsSection postData={object}></PostsSection>
                  <button onClick={(e) => handleClicked({ object })}>
                    {object.noOfComments} comments
                  </button>
                </li>
              ))}
            </div>
          ) : (
            <PostList postData={clickedPost} />
          )}
        </InfiniteScroll>
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
