import { Comment, List } from "antd";
import moment from "moment";
import { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import searchEngineClient from "../../../../utils/web3/searchEngine";


const LevelOneComments = () => {
  const [data, setData] = useState({});

  const COMMENT_DATA_QUERY = gql`
    query PostList($level: Int, $refId: Int, $groupId: Int) {
      postList(level: $level, refId: $refId, groupId: $groupId) {
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


  const commentDataQuery = async () => {
    const { loading, data, error } = await searchEngineClient.query({
      query: COMMENT_DATA_QUERY,
      variables: {
        level: 1,
        refId: 1601,
        groupId: 1,
      },
    });
    if (!loading) {
      if (error) {
        console.log(error);
      }
      if (data) {
        setData(data.postList.data);
      }
    }
  };

  useEffect(() => {
    commentDataQuery();
  });
  useEffect(() => {
    console.log(data);
  });


  return (
    <>
      <List
        className="comment-list"
        header={`${data.length} replies`}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <li>

                <Comment
                  actions={<span key="comment-list-reply-to-0">Reply to</span>}
                  author={item.createdBy}
                  avatar="https://joeschmoe.io/api/v1/random"
                  content={item.content}
                  datetime={item.createdAt}
                />

          </li>
        )}
      />
    </>
  );
};

export default LevelOneComments;
