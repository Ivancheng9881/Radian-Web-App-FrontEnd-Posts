import React, { useState, useEffect } from 'react';
import { List, message, Avatar, Skeleton, Divider } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { gql, useQuery, useLazyQuery } from "@apollo/client";


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





const InfiniteListExample = () => {
  const [isloading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [groupId, setGroupId] = useState(1);
  const [level, setLevel] = useState(0);
  const [refId, setRefId] = useState(null);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);

  const [fetchMore, {loading, error, data}] = useLazyQuery(POST_HOME_QUERY, {variables: { groupId, level, refId, skip, limit }, })







//   const loadMoreData = () => {
//     if (loading) {
//       return;
//     }
//     fetchMore
//       .then(res => res.json())
//       .then(body => {
//         setPosts([...posts, ...body.postList.data]);
//         setIsLoading(false);
//       })
//       .catch(() => {
//         setIsLoading(false);
//       });
//   };

//   useEffect(() => {
//     loadMoreData();
//   }, []);

useEffect(() => {
    fetchMore()
})

  if (loading) return <p>Loading ...</p>;
  if (error) return `Error! ${error}`;





  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      {/* <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name.last}</a>}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        />
      </InfiniteScroll> */}
    </div>
  );
};

export default InfiniteListExample;