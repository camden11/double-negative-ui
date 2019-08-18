import React from "react";
import Link from "next/link";

const Nav = () => (
  <>
    <nav>
      <Link href="/">
        <a>Double Negative</a>
      </Link>
    </nav>

    <style jsx>{`
      a {
        font-family: nimbus-sans-extended, sans-serif;
        text-decoration: none;
        font-size: 24px;
        color: #000;
      }

      a:visited {
        color: #000;
      }

      nav {
        position: fixed;
        z-index: 999;
      }
    `}</style>
  </>
);

export default Nav;
