import React from "react";

const Robots = () => {};

Robots.getInitialProps = async function({ res }) {
  res.write(
    "# robots.txt for Double Negative\nUser-agent: *\nDisallow: /*?\nDisallow: /*=\n\n# Sitemap File\n# Sitemap: https://doublenegative.cc/sitemap.xml"
  );
  res.end();
};

export default Robots;
// export default class extends React.Component {
//   static async getInitialProps({ req, res }) {
//     //res.writeHead(302, { Location: '/redirect' }) //sample how to response custom header
//     res.write("clear text");
//     res.end();
//   }
// }
