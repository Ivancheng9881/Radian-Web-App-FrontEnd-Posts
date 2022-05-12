import PostsSection from "../PostsSection/index";
import React from "react";
import styled from "styled-components";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { gql, useQuery } from "@apollo/client";
import PostComment from "../PostComment";
import Me from "../CommentSection/me";

const POST_DATA_QUERY = gql`
  query Query($groupId: Int, $level: Int) {
    postList(groupId: 1, level: 0) {
      data {
        postId
        content
        createdAt
        createdBy
        level
        groupId
      }
    }
  }
`;



const StyledContainer = styled.div`
  width: 50%;
  padding: 25px;
  background-color: rgba(256,256,256,0.5);
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
`

const StyledTopDiv = styled.div`
    width: 100%;
    height: 40px;
    display: inline-block;
    vertical-align: top;
    position: relative;
    margin-left: -1rem;
    margin-top: 0.5rem;
`



function PostsList() {
//   const { loading, error, data } = useQuery(POST_DATA_QUERY);
//   if (loading) return "Loading...";
//   if (error) return `Error! ${error.message}`;

  return (
    <StyledContainer>
        <StyledWrapper>
            <StyledTopDiv>
                <ArrowLeftOutlined style={{ fontSize: '23px', color: "#8e94ff"}}/>
            </StyledTopDiv>
        <PostsSection />
        <Me />
        <PostComment />
        </StyledWrapper>
    </StyledContainer>
  );
}

export default PostsList;
