import React from "react";
import { default as NextLink } from "next/link";
import Head from "next/head";
import Moment from "react-moment";
import _ from "lodash";
import Gallery from "../../components/gallery";
import PostContent from "../../components/postContent";
import PrismicClient from "../../transport/prismic";
import { RichText } from "prismic-reactjs";
import postQuery from "../../queries/post";

const Post = ({ doc }) => {
  const { data, first_publication_date } = doc;
  const byline = data.author
    ? `by ${_.get(data, "author.data.name")}`
    : "Multiple contributors";
  return (
    <>
      <Head>
        <title>{RichText.asText(data.title)} | Double Negative</title>
        <meta name="description" content={RichText.asText(data.blurb)} />
        <meta property="og:title" content={RichText.asText(data.title)} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`http://doublenegative.cc/post/${data.uid}`}
        />
        <meta property="og:image" content={_.get(data, "featureImage.url")} />
      </Head>
      <div className="post-grid">
        <div className="post-heading-column">
          <RichText render={data.title} />
          <div className="subheading">
            <RichText render={data.blurb} />
          </div>
        </div>
        <div className="post-meta-column">
          <span className="post-byline">{byline}</span>
          <br />
          <span className="post-date">
            <Moment date={first_publication_date} format="MMM DD YYYY" />
          </span>
          <ul className="post-categories">
            {_.get(data, "categories", []).map((item, index) => (
              <li key={index}>
                <NextLink href={`/?category=${_.get(item, "category.uid")}`}>
                  <a>{_.get(item, "category.data.name")}</a>
                </NextLink>
              </li>
            ))}
            {_.get(data, "genres", []).map((item, index) => (
              <li key={index}>
                <NextLink href={`/?genre=${_.get(item, "genre.uid")}`}>
                  <a>{_.get(item, "genre.data.name")}</a>
                </NextLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="post-content-column">
          <img
            className="post-feature-image"
            src={_.get(data, "feature_image.url")}
            alt={_.get(data, "feature_image.alt", "")}
          />
          <div className="post-mobile-meta">
            <span className="post-byline">{byline}</span>
            <br />
            <span className="post-date">
              <Moment date={first_publication_date} format="MMM DD YYYY" />
            </span>
          </div>
          <PostContent content={data.content} />
          {data.spotify_embed_id && (
            <div className="spotify">
              <iframe
                src={data.spotifyEmbed}
                width="100%"
                height="500"
                frameborder="0"
                allowtransparency="true"
                allow="encrypted-media"
              ></iframe>
            </div>
          )}
          {data.youtube_embed_id && (
            <div className="youtube">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${data.youtubeEmbed}`}
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          )}
          <div className="post-mobile-footer-meta">
            <p>
              Tagged under:{" "}
              {data.categories.map((category, index) => (
                <span key={index}>
                  <NextLink href={`/?category=${category.uid}`}>
                    <a className="post-mobile-meta-item">{category.name}</a>
                  </NextLink>{" "}
                </span>
              ))}
              {data.genres.map((genre, index) => (
                <span key={index}>
                  <NextLink href={`/?genre=${genre.uid}`}>
                    <a className="post-mobile-meta-item">{genre.name}</a>
                  </NextLink>{" "}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
      {data.gallery && (
        <>
          <h2>Photos</h2>
          <Gallery gallery={data.gallery} defaultAlt={data.title} />
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
  const { uid } = query;
  const doc = await PrismicClient.getByUID("post", uid, {
    graphQuery: postQuery
  });
  return {
    doc
  };
};

export default Post;
