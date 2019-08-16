import React from "react";
import Layout from "../layouts/base";
import PostGrid from "../components/postGrid";
import PostPreview from "../components/postPreview";
import Strapi from "../transport/strapi";

const Home = ({ posts }) => (
  <Layout>
    <PostGrid>
      {posts.map((post, index) => (
        <PostPreview post={post} key={index} />
      ))}
    </PostGrid>
  </Layout>
);

Home.getInitialProps = async function() {
  const posts = await Strapi.getEntries("posts");
  return {
    posts
  };
};

export default Home;
