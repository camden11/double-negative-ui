import React from "react";

const Footer = () => (
  <>
    <div>
      <p>© {new Date().getFullYear()} Double Negative</p>
    </div>
    <style jsx>{`
      div {
        padding-top: 40px;
      }
      p {
        font-size: 14px;
        text-align: center;
        color: #999;
      }
    `}</style>
  </>
);

export default Footer;
