import { Avatar, Divider, List, Skeleton } from "antd";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { gql, useQuery, useLazyQuery } from "@apollo/client";

const POST_HOME_QUERY = gql`
  query GetData(
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

const DemoOne = () => {
  const [groupId, setGroupId] = useState(1);
  const [level, setLevel] = useState(0);
  const [refId, setRefId] = useState(null);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const [postCount, setPostCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState([]);



  const { loading, error, data, fetchMore } = useQuery(POST_HOME_QUERY, {
    variables: { groupId, level, refId, skip, limit },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error.message}`;
  if (!data) return <p>Nothing to show...</p>;
  setPostData(data.postList.data);
  setPostCount(data.postList.meta.count);

  const FetchMorePosts = async () => {
    setSkip((prev) => prev + limit);

    const fetchedMore = await fetchMore({
      variables: { groupId, level, refId, skip, limit },
    });
    const { data } = fetchedMore.data.postList;

    setPostData((previousData) => [...previousData, ...data]);
    setIsLoading(false);
  };

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 800,
        width: 600,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        dataLength={postCount}
        next={FetchMorePosts}
        hasMore={postData.length < postCount}
        loader={
          <Skeleton
            // avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={postData}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                // avatar={<Avatar src={item.picture.large} />}
                title={<p>{item.postId}</p>}
                description={item.content}
              />
              <div>Content</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default DemoOne;
