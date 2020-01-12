import React, { useState } from "react";
import Link from "next/link";
import navIcon from "../public/nav_icon.png";

const Nav = ({ setAnimating }) => {
  const [open, setOpen] = useState(false);
  const closeOnNavigate = () => {
    setAnimating(true);
    setOpen(false);
    setTimeout(() => {
      setAnimating(false);
    }, 300);
  };
  return (
    <>
      <nav className={open ? "open" : "closed"}>
        <div className="top-bar">
          <button className="toggle" onClick={() => setOpen(!open)}>
            <img className="top-icon" src={navIcon} />
            <img className="bottom-icon open" src={navIcon} />
          </button>
          <Link href="/">
            <a className="title">Double Negative</a>
          </Link>
        </div>
        <div className="menu">
          <ul>
            <li onClick={closeOnNavigate}>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li onClick={closeOnNavigate}>
              <Link href="/posts/all">
                <a>Stories</a>
              </Link>
            </li>
            <li onClick={closeOnNavigate}>
              {" "}
              <Link href="/shows">
                <a>Shows</a>
              </Link>
            </li>
            <li onClick={closeOnNavigate}>
              {" "}
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <style jsx>{`
        .title {
          font-family: nimbus-sans-extended, sans-serif;
          text-decoration: none;
          font-size: 24px;
          color: #000;
          text-transform: uppercase;
          margin: 0 auto;
          padding: 13px 0;
          position: relative;
          left: -30px;
        }

        a:visited {
          color: #000;
        }

        .top-bar {
          position: fixed;
          z-index: 999;
          display: flex;
          width: 100%;
          border-bottom: 2px solid #000;
          background-color: #fff;
        }

        .toggle {
          width: 60px;
          height: 60px;
          background-color: #000;
          display: block;
          border: none;
          line-height: 14px;
        }

        .top-icon,
        .bottom-icon {
          width: 24px;
          height: auto;
          transition: all 0.2s ease-in-out;
        }

        .open .top-icon {
          transform: translateY(7px) rotate(45deg);
        }

        .open .bottom-icon {
          transform: translateY(-7px) rotate(-45deg);
        }

        .menu {
          width: 100%;
          height: 100%;
          background-color: #fff;
          border-right: 2px solid #000;
          position: fixed;
          z-index: 999;
          top: 62px;
          padding: 20px;
          left: calc(-100% - 42px);
          transition: all 0.3s ease-in-out;
          box-sizing: border-box;
        }

        .open .menu {
          left: 2px;
        }

        .menu a {
          text-decoration: underline;
          font-family: nimbus-sans;
          font-size: 24px;
          text-transform: uppercase;
        }

        .menu ul {
          text-align: center;
          margin-top: 130px;
        }

        .menu li {
          margin-bottom: 25px;
          text-aling: center;
        }

        @media (max-width: 768px) {
          .title {
            font-size: 20px;
            padding: 15px 0;
            margin-left: 20px;
            left: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Nav;
