import React from "react";
import Heading from "../../components/Heading";
import Markdown from "../../components/Markdown";
import Layout from "../../layouts/base";
import Strapi from "../../transport/strapi";

const Post = ({ post }) => (
  <Layout>
    <Heading level={1}>{post.title}</Heading>
    <Markdown content={post.content} />
  </Layout>
);

Post.getInitialProps = async function({ query }) {
  const { slug } = query;
  const entries = await Strapi.getEntries("posts", { slug });
  return {
    post: entries[0]
  };
};

export default Post;
