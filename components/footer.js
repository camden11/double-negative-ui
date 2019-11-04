import React from "react";
import logo from "../static/logo.png";
import insta from "../static/insta.png";
import twitter from "../static/twitter.png";

const Footer = () => (
  <>
    <div className="footer">
      <div className="copyright-container">
        <p>© {new Date().getFullYear()} Double Negative</p>
      </div>
      <div className="social-container">
        <div>
          <a href="https://twitter.com/doublenegativ">
            <img className="twitter" src={twitter} alt="Twitter logo" />
          </a>
        </div>
        <div>
          <a href="https://www.instagram.com/doublenegative_blog/">
            <img className="insta" src={insta} alt="Instagram logo" />
          </a>
        </div>
      </div>
    </div>
    <style jsx>{`
      .footer {
        border-top: 2px solid #000;
        padding-top: 15px;
        margin-top: 50px;
        display: flex;
      }
      .logo-container {
        margin-right: 10px;
      }
      .logo {
        width: 12px;
      }
      .copyright-container {
        padding-top: 6px;
        flex-grow: 1;
      }
      .social-container {
        display: flex;
      }
      .insta {
        height: 20px;
        width: auto;
      }
      .twitter {
        height: 22px;
        width: auto;
        margin-right: 10px;
      }
      p {
        font-size: 14px;
      }
    `}</style>
  </>
);

export default Footer;
