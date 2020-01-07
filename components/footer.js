import React from "react";
import logo from "../public/logo.png";
import insta from "../public/insta.png";
import twitter from "../public/twitter.png";

const Footer = () => (
  <>
    <div className="footer">
      <div className="container">
        <div className="copyright-container">
          <p>© {new Date().getFullYear()} Double Negative</p>
        </div>
        <div className="logo-container">
          <img className="logo" src={logo} />
        </div>
        <div className="social-container">
          <div>
            <a href="https://twitter.com/doublenegativ">Twitter</a>
          </div>
          <div>
            <a href="https://www.instagram.com/doublenegative_blog/">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
      .footer {
        border-top: 2px solid #000;
        padding: 25px 0px 10px;
        margin-top: 50px;
      }
      .footer > .container {
        display: flex;
        padding: 0;
      }
      .copyright-container {
        margin-top: 5px;
      }
      .logo-container {
        text-align: center;
        flex-grow: 1;
      }
      .logo {
        width: 12px;
      }

      .social-container {
        display: flex;
        margin-top: 5px;
      }

      .social-container > div {
        padding-left: 20px;
      }
      .social-container > div > a {
        text-transform: uppercase;
      }
    `}</style>
  </>
);

export default Footer;
