import React from "react";
import Moment from "react-moment";
import _ from "lodash";
import Heading from "../../components/heading";
import Markdown from "../../components/markdown";
import Layout from "../../layouts/base";
import Strapi from "../../transport/strapi";

const Post = ({ post }) => (
  <>
    <Layout>
      <div className="post-grid">
        <div className="post-heading-column">
          <Heading level={1}>{post.title}</Heading>
          <p className="subheading">{post.blurb}</p>
        </div>
        <div className="post-meta-column">
          <span className="post-byline">by {_.get(post, "author.name")}</span>
          <br />
          <span className="post-date">
            <Moment date={post.updatedAt} format="MMM DD YYYY" />
          </span>
          <ul class="post-categories">
            {_.get(post, "categories", []).map((category, index) => (
              <li key={index}>
                <a href="#">{category.name}</a>
              </li>
            ))}
            {_.get(post, "genres", []).map((genre, index) => (
              <li key={index}>
                <a href="#">{genre.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="post-content-column">
          <img
            className="post-feature-image"
            src={_.get(post, "featureImage.url")}
          />
          <Markdown content={post.content} />
        </div>
      </div>
    </Layout>
    <style jsx>{`
      .post-grid {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-column-gap: 30px;
      }

      .post-heading-column {
        grid-row: 1;
        grid-column: 4 / 11;
      }

      .post-meta-column {
        grid-row: 2;
        grid-column: span 3;
        border-top: 2px solid #000;
        padding-top: 20px;
        margin-right: 20px;
      }

      .post-content-column {
        grid-row: 2;
        grid-column: span 8;
      }

      @media (max-width: 768px) {
        .post-heading-column {
          grid-column: span 12;
        }
        .post-meta-column {
          display: none;
        }

        .post-content-column {
          grid-column: span 12;
        }
      }

      li {
        text-transform: uppercase;
      }

      .subheading {
        font-size: 20px;
        margin-bottom: 30px;
        margin-top: 0;
      }

      .post-feature-image {
        margin-bottom: 40px;
      }
    `}</style>
  </>
);

Post.getInitialProps = async function({ query }) {
  const { slug } = query;
  const entries = await Strapi.getEntries("posts", { slug });
  return {
    post: entries[0]
  };
};

export default Post;
