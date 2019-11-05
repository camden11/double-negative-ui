import React from "react";
import Link from "next/link";
import Head from "next/head";
import Moment from "react-moment";
import _ from "lodash";
import Heading from "../../components/heading";
import Markdown from "../../components/markdown";
import Gallery from "../../components/gallery";
import Layout from "../../layouts/base";
import Strapi from "../../transport/strapi";

const Post = ({ post }) => {
  const byline = post.author
    ? `by ${_.get(post, "author.name")}`
    : "Multiple contributors";
  return (
    <>
      <Head>
        <title>{post.title} | Double Negative</title>
        <meta name="description" content={post.blurb} />
        <meta property="og:title" content={post.title} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`http://doublenegative.cc/post/${post.slug}`}
        />
        <meta property="og:image" content={_.get(post, "featureImage.url")} />
      </Head>
      <div className="post-grid">
        <div className="post-heading-column">
          <Heading level={1}>{post.title}</Heading>
          <p className="subheading">{post.blurb}</p>
        </div>
        <div className="post-meta-column">
          <span className="post-byline">{byline}</span>
          <br />
          <span className="post-date">
            <Moment date={post.publishDate} format="MMM DD YYYY" />
          </span>
          <ul className="post-categories">
            {_.get(post, "categories", []).map((category, index) => (
              <li key={index}>
                <Link href={`/?category=${category.slug}`}>
                  <a>{category.name}</a>
                </Link>
              </li>
            ))}
            {_.get(post, "genres", []).map((genre, index) => (
              <li key={index}>
                <Link href={`/?genre=${genre.slug}`}>
                  <a>{genre.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="post-content-column">
          <img
            className="post-feature-image"
            src={_.get(post, "featureImage.url")}
            alt={_.get(post, "featureImageAlt", "")}
          />
          <div className="post-mobile-meta">
            <span className="post-byline">{byline}</span>
            <br />
            <span className="post-date">
              <Moment date={post.publishDate} format="MMM DD YYYY" />
            </span>
          </div>
          <Markdown content={post.content} />
          {post.spotifyEmbed && (
            <div className="spotify">
              <iframe
                src={post.spotifyEmbed}
                width="100%"
                height="500"
                frameborder="0"
                allowtransparency="true"
                allow="encrypted-media"
              ></iframe>
            </div>
          )}
          {post.youtubeEmbed && (
            <div className="youtube">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${post.youtubeEmbed}`}
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          )}
          <div className="post-mobile-footer-meta">
            <p>
              Tagged under:{" "}
              {post.categories.map((category, index) => (
                <span key={index}>
                  <Link href={`/?category=${category.slug}`}>
                    <a className="post-mobile-meta-item">{category.name}</a>
                  </Link>{" "}
                </span>
              ))}
              {post.genres.map((genre, index) => (
                <span key={index}>
                  <Link href={`/?genre=${genre.slug}`}>
                    <a className="post-mobile-meta-item">{genre.name}</a>
                  </Link>{" "}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
      {post.gallery && (
        <>
          <h2>Photos</h2>
          <Gallery gallery={post.gallery} />
        </>
      )}
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

        .post-mobile-meta {
          display: none;
        }

        .post-mobile-footer-meta {
          display: none;
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

        .post-gallery-container {
          grid-column: 3 / 13;
        }

        .spotify {
          margin-top: 40px;
        }

        .youtube {
          margin-top: 40px;
          position: relative;
          padding-bottom: 56.25%;
          padding-top: 30px;
          height: 0;
          overflow: hidden;
        }

        .youtube iframe,
        .youtube object,
        .youtube embed {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .logo {
          width: 100px;
          margin: 0 auto;
          display: block;
        }

        @media (max-width: 768px) {
          .post-grid {
            grid-column-gap: 0;
          }

          .post-heading-column {
            grid-column: span 12;
          }
          .post-meta-column {
            display: none;
          }

          .post-content-column {
            grid-column: span 12;
          }

          .post-mobile-meta {
            display: block;
            margin-bottom: 10px;
          }

          .post-feature-image {
            margin-bottom: 30px;
          }

          .post-gallery-container {
            grid-column: span 12;
          }

          .post-mobile-footer-meta {
            display: block;
            border-top: 2px solid #000;
            margin-top: 40px;
            padding-top: 10px;
          }

          .post-mobile-meta-item {
            text-transform: uppercase;
            text-decoration: underline;
          }
        }
      `}</style>
    </>
  );
};

Post.getInitialProps = async function({ query }) {
  const { slug } = query;
  const entries = await Strapi.getEntry("posts", slug);
  return {
    post: entries[0]
  };
};

export default Post;
