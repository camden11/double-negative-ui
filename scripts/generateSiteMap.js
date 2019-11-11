#!/usr/bin/env node

require("dotenv").config({ path: __dirname + "../.env" });
const fs = require("fs");
const moment = require("moment");
const Strapi = require("../transport/strapi");

const formatDate = date => moment(date).format("YYYY-MM-DD");
const lastModified = formatDate(new Date());

const xmlUrlWrapper = nodes => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${nodes}
</urlset>`;

const xmlUrlNode = (domain, pageUrl, lastmod) => {
  const loc = `${domain}${pageUrl}`;

  return `<url>
  <loc>${loc}</loc>
  <lastmod>${lastmod}</lastmod>
</url>`;
};

const generateSitemap = async () => {
  const targetFolder = "./public";
  const fileName = "sitemap.xml";

  const posts = await Strapi.getEntries("posts", {
    sort: {
      field: "publishDate",
      order: "desc"
    }
  });

  posts.push({});

  const sitemap = `${xmlUrlWrapper(
    posts.map(post =>
      xmlUrlNode(
        "https://doublenegative.cc",
        `${post.uid ? `/post/${post.uid}` : ""}`,
        lastModified
      )
    ).join(`
`)
  )}`;

  fs.writeFile(`${targetFolder}/${fileName}`, sitemap, err => {
    if (err) {
      throw err;
    }
  });
};

generateSitemap();
