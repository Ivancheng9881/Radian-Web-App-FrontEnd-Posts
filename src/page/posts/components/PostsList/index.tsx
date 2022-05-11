import PostsSection from "../PostsSection/index";
import React from "react";
import styled from "styled-components";

import { gql, useQuery } from "@apollo/client";

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
  background-color: pink;
  border-radius: 30px;
  display: inline-flex;
  flex-direction: column;
`;

function PostsList() {
//   const { loading, error, data } = useQuery(POST_DATA_QUERY);
//   if (loading) return "Loading...";
//   if (error) return `Error! ${error.message}`;

  return (
    <StyledContainer>
      <PostsSection />
      <PostsSection />
      <PostsSection />
      <PostsSection />
      <PostsSection />
      <PostsSection />
    </StyledContainer>
  );
}

export default PostsList;
