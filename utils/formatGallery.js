import _ from "lodash";
import getOptimizedImage from "../utils/getOptimizedImage";

const formatGallery = (gallery, defaultAlt) => {
  return gallery.map(item => {
    return {
      src: getOptimizedImage(_.get(item, "photo.url"), { width: 1000 }),
      alt: _.get(item, "photo.alt", defaultAlt)
    };
  });
};

export default formatGallery;
