import PostsSection from "../PostsSection/index";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { gql } from "@apollo/client";
import searchEngineClient from "../../../../utils/web3/searchEngine";
import LevelOneComments from "../CommentSection/LevelOneComments";

const StyledContainer = styled.div`
  width: 50%;
  padding: 25px;
  background-color: rgba(256, 256, 256, 0.5);
  border-radius: 20px;
  display: inline-flex;
  flex-direction: column;
  margin-left: 25%;
  margin-top: 25px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: absolute;
`;

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledTopDiv = styled.div`
  width: 100%;
  height: 40px;
  display: inline-block;
  vertical-align: top;
  position: relative;
  margin-left: -1rem;
  margin-top: 0.5rem;
`;

const PostsList = () => {
  const [postData, setPostData] = useState({});
  const [hasComments, setHasComments] = useState(false);

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

  const postDataQuery = async () => {
    const { loading, data, error } = await searchEngineClient.query({
      query: POST_DATA_QUERY,
      variables: {
        groupId: 1,
        level: 0,
        refId: null,
        limit: 1,
      },
    });
    if (!loading) {
      if (error) {
        console.log(error);
      }
      if (data) {
        setPostData(data.postList.data[0]);
      }
    }
  };

  useEffect(() => {
    postDataQuery();
  }, [postData]);

  useEffect(() => {
    if (postData.noOfComments > 0) {
      setHasComments(true);
    }
  }, [postData]);

  return (
    <StyledContainer>
      <StyledWrapper>
        <StyledTopDiv>
          <ArrowLeftOutlined style={{ fontSize: "23px", color: "#8e94ff" }} />
        </StyledTopDiv>
        <PostsSection postData={postData} />
        {hasComments && <div>dsfsdfsdfdsf</div>}
      </StyledWrapper>
    </StyledContainer>
  );
};

export default PostsList;
