import React from "react";
import PostGrid from "./postGrid";
import PostPreview from "./postPreview";
import FilterBar from "./filterBar";
import Pagination from "./pagination";
import setFilter from "../utils/setFilter";
import constants from "../constants";

const PostPage = ({
  posts,
  genres,
  postCount,
  genreQuery,
  category,
  pageQuery,
  title
}) => {
  const changePage = page => {
    setFilter(null, genreQuery, page);
  };

  const numPages = Math.ceil(postCount / constants.POST_LIMIT);
  return (
    <>
      <div className="container">
        <h1>{title}</h1>
        <FilterBar
          genres={genres}
          category={category}
          genreFilter={genreQuery}
          postMode={true}
        />
        <PostGrid>
          {posts.map((doc, index) => (
            <PostPreview doc={doc} key={index} />
          ))}
        </PostGrid>
        <Pagination
          numPages={numPages}
          currentPage={pageQuery}
          onChangePage={changePage}
        />
      </div>
      <style jsx>{`
        h1 {
          margin-bottom: 40px;
        }
      `}</style>
    </>
  );
};

export default PostPage;
