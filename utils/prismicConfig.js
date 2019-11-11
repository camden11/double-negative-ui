import _ from "lodash";

export const hrefResolver = doc => {
  if (doc.type === "post") {
    return {
      pathname: "/post/[uid]",
      query: { uid: _.get(doc, "data.uid") }
    };
  }
  return "/";
};

export const linkResolver = doc => {
  if (doc.type === post) {
    return "/post/uid";
  }
};
