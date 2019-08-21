const formatGallery = ({ photos }) => {
  return photos.map(photo => {
    return {
      src: photo.url
    };
  });
};

export default formatGallery;
