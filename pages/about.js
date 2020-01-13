import React from "react";
import { RichText } from "prismic-reactjs";
import Prismic from "prismic-javascript";
import FilterBar from "../components/filterBar";
import Author from "../components/author";
import PrismicClient from "../transport/prismic";

const About = ({ doc, doc: { data }, authors }) => {
  return (
    <>
      <div className="container">
        <h1 className="page-title">About</h1>
        <div className="about-grid">
          <div className="about-column">
            <RichText render={data.about_us} />
          </div>
          <div className="contact-column">
            <div>
              <h4>Contact Us</h4>
              <a href={`mailto:${data.contact_email}`}>{data.contact_email}</a>
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="container our-team">
        <FilterBar overrideFilterText="Our Team" />
        {authors.map((author, index) => (
          <Author author={author} key={index} />
        ))}
      </div>
      <style jsx global>{`
        .about-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-column-gap: 20px;
          margin-bottom: 60px;
        }

        .about-column {
          grid-column: span 7;
        }

        .about-column p {
          font-size: 20px;
          margin-bottom: 0;
        }

        .contact-column {
          grid-column: span 5;
          text-align: right;
          display: flex;
          align-items: flex-end;
        }

        .contact-column > div {
          width: 100%;
        }

        .contact-column h4 {
          margin-bottom: 5px;
        }

        .divider {
          display: none;
        }

        .our-team {
          padding-bottom: 40px;
        }

        @media (max-width: 768px) {
          .about-column,
          .contact-column {
            grid-column: span 12;
          }

          .contact-column {
            text-align: left;
            margin-top: 30px;
          }

          .divider {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

About.getInitialProps = async () => {
  const doc = await PrismicClient.getSingle("about_page");
  const authorData = await PrismicClient.query([
    Prismic.Predicates.at("document.type", "author"),
    Prismic.Predicates.at("my.author.show_on_about_page", "Yes")
  ]);
  return { doc, authors: authorData.results };
};

export default About;
