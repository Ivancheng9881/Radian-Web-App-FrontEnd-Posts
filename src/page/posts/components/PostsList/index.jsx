import PostsSection from "../PostsSection/index";
import styled from "styled-components";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { gql, useQuery } from "@apollo/client";
import LevelOneComments from "../CommentSection/LevelOneComments";
import PostComment from "../PostComment/index";
import { useEffect, useRef } from "react";

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

  useEffect(() => {
    let element = document.getElementById("rd-post-comment-container");
    console.log(element + "sdfsdfsdfsdf");
  }, []);

  if (loading) return null;
  if (error) return "ERROR!";
  if (data) console.log(data);

  return (
    <StyledContainer>
      <StyledWrapper>
        <StyledTopDiv>
          <ArrowLeftOutlined style={{ fontSize: "23px", color: "#8e94ff" }} />
        </StyledTopDiv>
        <PostsSection postData={data.postList.data[0]} />
        <button> Click to scroll </button>

        {data.postList.data[0].noOfComments > 0 && (
          <LevelOneComments
            amountOfComments={data.postList.data[0].noOfComments}
          />
        )}
        <PostComment />
      </StyledWrapper>
    </StyledContainer>
  );
};

export default PostsList;
