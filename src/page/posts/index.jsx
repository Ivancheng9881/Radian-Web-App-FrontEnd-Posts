import DefaultLayout from "../../components/Layout";
import { Layout } from "antd";

import { Row, Col, Affix } from "antd";
import LeftSideBar from "./components/LeftSideBar";
import PostHome from "./components/PostHome";

const PostsPage = () => {
  return (
    <DefaultLayout>
      <Layout.Content>
          <Row className="rd-post-background-container">
            <Col xl={6} lg={6} md={0} sm={0}>
              <Affix offsetTop={130}>
                <div className="rd-left-side-post-container">
                  <LeftSideBar />
                </div>
              </Affix>
            </Col>
            <Col
              xl={12}
              lg={12}
              md={18}
              sm={24}
              xs={24}
              className="rd-middle-column-post"
            >
              <div className="rd-post-section-container">
                {/* <PostHome /> */}
              </div>
            </Col>
            <Col xl={6} lg={6} md={6} sm={0}>
              <Affix offsetTop={130}>
                <div className="rd-right-side-post-container"></div>
              </Affix>
            </Col>
          </Row>
      </Layout.Content>
    </DefaultLayout>
  );
};

export default PostsPage;
