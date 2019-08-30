import React from "react";
import Link from "next/link";

const Nav = () => (
  <>
    <nav>
      <Link href="/">
        <a>Double Negative</a>
      </Link>
      {/* <button className="mobile-menu">&#9776;</button> */}
    </nav>

    <style jsx>{`
      a {
        font-family: nimbus-sans-extended, sans-serif;
        text-decoration: none;
        font-size: 24px;
        color: #000;
        flex-grow: 1;
      }

      a:visited {
        color: #000;
      }

      nav {
        position: fixed;
        display: flex;
        z-index: 999;
        width: 85%;
        max-width: 1000px;
      }

      .mobile-menu {
        border: none;
        background: transparent;
        margin-left: auto;
        font-size: 20px;
        position: relative;
        right: 6px;
      }
    `}</style>
  </>
);

export default Nav;
