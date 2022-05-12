import { FC, useEffect, useRef, useState } from "react";
import PostsSection from "./components/PostsSection";
import PostsList from "./components/PostsList";
import DefaultLayout from "../../components/Layout";
import { Layout } from "antd";

import DefaultFooter from "../../components/Footer";
import { useLocation } from "react-router";
import LandingSection from "../../page/landing/components/Section.components";



const PostsPage = () => {
  return (

    <DefaultLayout>
    <Layout.Content>
        <PostsList />
    </Layout.Content>
  </DefaultLayout>
 
  );
};

export default PostsPage;


