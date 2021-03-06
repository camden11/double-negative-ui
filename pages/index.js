import React from "react";
import Head from "next/head";
import Prismic from "prismic-javascript";
import Link from "next/link";
import _ from "lodash";
import getSavedCity from "../utils/getSavedCity";
import FeaturedPost from "../components/featuredPost";
import PostGrid from "../components/postGrid";
import PostPreview from "../components/postPreview";
import ShowGrid from "../components/showGrid";
import ShowPreview from "../components/showPreview";
import FilterBar from "../components/filterBar";
import PrismicClient from "../transport/prismic";
import AirtableClient from "../transport/airtable";
import allPostsQuery from "../queries/allPosts";
import homePageQuery from "../queries/homePage";

const Home = ({ posts, featuredPost, cities, city, shows }) => {
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
      {featuredPost && <FeaturedPost doc={featuredPost} />}
      <div className="divider"></div>
      <div className="container post-section">
        <FilterBar postMode={true} overrideFilterText="Latest Stories" />
        <PostGrid>
          {posts.map((doc, index) => (
            <PostPreview doc={doc} key={index} />
          ))}
        </PostGrid>
        <Link href={{ pathname: "/posts/all" }} as="/posts/all">
          <a className="button-large">View more</a>
        </Link>
      </div>
      <div className="divider"></div>
      <div className="container show-section">
        <FilterBar
          postMode={false}
          cities={cities}
          cityFilter={city}
          homePage
        />
        <ShowGrid>
          {shows.map((show, index) => (
            <ShowPreview show={show} key={index} />
          ))}
        </ShowGrid>
        <Link href={{ pathname: "/shows" }} as={`/shows/`}>
          <a className="button-large">View more</a>
        </Link>
      </div>
      <style jsx>{`
        .container {
          padding-top: 30px;
          padding-bottom: 150px;
        }

        .show-section {
          padding-bottom: 100px;
        }

        .button-large {
          float: right;
        }
      `}</style>
    </>
  );
};

Home.getInitialProps = async ctx => {
  const city = getSavedCity(ctx);

  const pageData = await PrismicClient.query(
    Prismic.Predicates.at("document.type", "home_page"),
    { graphQuery: homePageQuery }
  );
  const featuredPost = _.get(pageData, "results[0].data.featured_post");

  const postPredicates = [Prismic.Predicates.at("document.type", "post")];
  if (featuredPost.id) {
    postPredicates.push(Prismic.Predicates.not("document.id", featuredPost.id));
  }

  const postData = await PrismicClient.query(postPredicates, {
    pageSize: 7,
    orderings: "[document.first_publication_date desc]",
    graphQuery: allPostsQuery
  });

  const cityData = await PrismicClient.query(
    Prismic.Predicates.at("document.type", "city"),
    {
      orderings: "[my.city.name]"
    }
  );

  const shows = await AirtableClient.fetchShows(city, 4);

  let featuredPostToUse;
  let posts;

  if (featuredPost.id) {
    featuredPostToUse = featuredPost;
    posts = postData.results.slice(0, 6);
  } else {
    featuredPostToUse = postData.results[0];
    posts = postData.results.slice(1, 7);
  }

  return {
    featuredPost: featuredPostToUse,
    posts,
    cities: cityData.results,
    city,
    shows
  };
};

export default Home;
