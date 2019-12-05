import React from "react";
import _ from "lodash";
import { default as NextLink } from "next/link";

const Byline = ({ data, linkToAuthor = false }) => {
  let bylineContent;
  if (_.get(data, "authors", []).length === 1) {
    const nameText = _.get(data, "authors[0].author.data.name");
    const AuthorName = linkToAuthor ? (
      <NextLink href={`/author/${_.get(data, "authors[0].author.uid")}`}>
        {nameText}
      </NextLink>
    ) : (
      nameText
    );
    bylineContent = <span className="post-byline">by {AuthorName}</span>;
  } else {
    bylineContent = "Multiple contributors";
  }
  return (
    <>
      <span className="post-byline">{bylineContent}</span>
      <style jsx>{`
        .post-byline {
          font-family: nimbus-sans-extended;
          font-weight: 700;
          font-size: 12px;
        }
      `}</style>
    </>
  );
};

export default Byline;
