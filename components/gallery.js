import React from "react";
import ReactGallery from "react-grid-gallery";
import formatGallery from "../utils/formatGallery";

const Thumbnail = ({ item }) => {
  return (
    <div
      className="gallery-thumbnail"
      style={{ backgroundImage: `url(${item.src})` }}
    />
  );
};
const Gallery = ({ gallery }) => (
  <div className="gallery">
    <ReactGallery
      images={formatGallery(gallery)}
      thumbnailImageComponent={Thumbnail}
    />
    <style jsx global>{`
      .gallery {
        margin: 60px 0;
      }

      .gallery-thumbnail {
        width: 100%;
        height: 100%;
        background-size: cover;
      }

      .ReactGridGallery {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-column-gap: 10px;
        grid-row-gap: 10px;
      }

      .ReactGridGallery_tile {
        grid-column: span 2;
        cursor: pointer;
      }

      .ReactGridGallery_tile-viewport {
        height: 180px !important;
      }

      .ReactGridGallery_tile-icon-bar {
        display: none;
      }

      @media (max-width: 992px) {
        .ReactGridGallery_tile {
          grid-column: span 3;
        }
      }

      @media (max-width: 560px) {
        .ReactGridGallery_tile-viewport {
          height: 120px !important;
        }
      }
    `}</style>
  </div>
);

export default Gallery;
