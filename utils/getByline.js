import _ from "lodash";

const getByline = data => {
  return _.get(data, "authors", []).length === 1
    ? `by ${_.get(data, "authors[0].author.data.name")}`
    : "Multiple contributors";
};

export default getByline;
