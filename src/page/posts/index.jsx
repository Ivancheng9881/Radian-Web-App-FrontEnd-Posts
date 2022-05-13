import { FC, useEffect, useRef, useState } from "react";
import PostsSection from "./components/PostsSection";
import PostsList from "./components/PostsList";
import DefaultLayout from "../../components/Layout";
import { Layout } from "antd";

import DefaultFooter from "../../components/Footer";
import { useLocation } from "react-router";
import LandingSection from "../landing/components/Section.components";
import styled from "styled-components";
import internal from "stream";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  border: 15px solid black;
  margin-top: 100px;
  background-color: rgb(172, 193, 244);
`;




const PostsPage = () => {
  return (
    <DefaultLayout>
      <Layout.Content>
        <Container>
          <PostsList />
        </Container>
      </Layout.Content>
    </DefaultLayout>
  );
};

export default PostsPage;
