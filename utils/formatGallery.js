const formatGallery = ({ photos, title }) => {
  return photos.map(photo => {
    return {
      src: photo.url,
      alt: title
    };
  });
};

export default formatGallery;
