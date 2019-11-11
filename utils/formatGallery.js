import _ from "lodash";

const formatGallery = (gallery, defaultAlt) => {
  return gallery.map(item => {
    return {
      src: _.get(item, "photo.url"),
      alt: _.get(item, "photo.alt", defaultAlt)
    };
  });
};

export default formatGallery;
