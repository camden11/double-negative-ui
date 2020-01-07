import _ from "lodash";

const getPublishDate = doc => {
  const { data, first_publication_date } = doc;
  const legacyDate = _.get(data, "legacy_publish_date", null);
  return legacyDate === null ? first_publication_date : legacyDate;
};

export default getPublishDate;
