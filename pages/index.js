import React, { useState, useEffect } from "react";
import Head from "next/head";
import Prismic from "prismic-javascript";
import Link from "next/link";
import FeaturedPost from "../components/featuredPost";
import PostGrid from "../components/postGrid";
import PostPreview from "../components/postPreview";
import ShowGrid from "../components/showGrid";
import ShowPreview from "../components/showPreview";
import FilterBar from "../components/filterBar";
import PrismicClient from "../transport/prismic";
import AirtableClient from "../transport/airtable";
import allPostsQuery from "../queries/allPosts";
import constants from "../constants";

const Home = ({ posts, initialShows }) => {
  const [shows, setShows] = useState(initialShows);

  const featuredPost = posts[0];
  const previewPosts = posts.slice(1, posts.length);
  return (
    <>
      <Head>
        <title>Double Negative</title>
        <meta
          name="description"
          content="Double Negative is a very underground music blog."
        />
        <meta property="og:title" content="Double Negative" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://doublenegative.cc/" />
        <meta property="og:image" content="/public/og_image.png" />
      </Head>
      <FeaturedPost doc={featuredPost} />
      <div className="divider"></div>
      <div className="container show-section">
        <FilterBar postMode={false} />
        <ShowGrid>
          {shows.map((show, index) => (
            <ShowPreview show={show} key={index} />
          ))}
        </ShowGrid>
        <Link href={{ pathname: "/shows" }} as={`/shows/`}>
          <a className="button-large">View more</a>
        </Link>
      </div>
      <div className="divider"></div>
      <div className="container post-section">
        <FilterBar postMode={true} />
        <PostGrid>
          {previewPosts.map((doc, index) => (
            <PostPreview doc={doc} key={index} />
          ))}
        </PostGrid>
        <a className="button-large">View more</a>
      </div>
      <style jsx>{`
        .divider {
          border-bottom: 2px solid black;
        }

        .container {
          padding-top: 30px;
          padding-bottom: 120px;
        }

        .button-large {
          float: right;
        }
      `}</style>
    </>
  );
};

Home.getInitialProps = async () => {
  const postData = await PrismicClient.query(
    Prismic.Predicates.at("document.type", "post"),
    {
      pageSize: 7,
      orderings: "[document.first_publication_date desc]",
      graphQuery: allPostsQuery
    }
  );

  const shows = await AirtableClient.fetchShows("new-york", 4);

  return {
    posts: postData.results,
    initialShows: shows
  };
};

export default Home;
