import React, { useState, useEffect } from "react";
import { RichText } from "prismic-reactjs";
import stringHash from "string-hash";
import { setCookie } from "nookies";
import closeIcon from "../public/close_icon.png";

const Announcement = ({ title, text, cookies }) => {
  const [closed, setClosed] = useState(false);
  const cookieName = `dn-announce-${stringHash(title)}`;
  useEffect(() => {
    if (cookies[cookieName]) {
      setClosed(true);
    }
  }, []);
  const close = () => {
    setClosed(true);
    setCookie({}, cookieName, true, { maxAge: 60 * 60 * 24 * 30 });
  };
  if (closed) {
    return null;
  }
  return (
    <>
      <div className="announcement">
        <div className="announcement-inner">
          <button onClick={close}>
            <img className="close-icon" src={closeIcon} alt="Close" />
          </button>
          <h5>{title}</h5>
          <RichText render={text} />
        </div>
      </div>
      <style jsx global>{`
        .announcement {
          position: fixed;
          background-color: #000;
          color: #fff;
          bottom: 20px;
          right: 20px;
          font-family: nimbus-sans, sans-serif;
          border: 2px solid #fff;
          width: 300px;
        }

        .announcement-inner {
          position: relative;
          padding: 25px 15px;
        }

        .announcement h5 {
          font-family: nimbus-sans-extended, sans-serif;
          font-size: 14px;
          margin: 0;
          margin-bottom: 10px;
        }

        .announcement p {
          font-size: 14px;
          margin: 0;
        }

        .announcement a {
          color: #fff;
          text-decoration: underline;
        }

        .announcement button {
          position: absolute;
          top: 6px;
          right: 6px;
          border: none;
        }

        .announcement button:hover {
          background: transparent;
        }

        .announcement button img {
          width: 12px;
        }

        @media (max-width: 768px) {
          .announcement {
            width: 100%;
            bottom: 0;
            left: 0;
            border-bottom: none;
            border-left: none;
            border-right: none;
          }

          .announcement-inner {
            padding: 15px;
            padding-right: 25px;
          }

          .announcement h5 {
            font-size: 12px;
            margin-bottom: 5px;
          }

          .announcement p {
            font-size: 12px;
          }

          .announcement button {
            position: absolute;
            top: 12px;
            right: 6px;
            border: none;
          }
        }
      `}</style>
    </>
  );
};

export default Announcement;
