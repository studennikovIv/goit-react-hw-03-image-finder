import React from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
const ImageGallery = ({ imgInfo, openModal }) => {
  return (
    <ul className={css.ImageGallery}>
      {imgInfo.map(({ id, webformatURL, tags, largeImageURL }) => {
        return (
          <ImageGalleryItem
            id={id}
            webformatURL={webformatURL}
            key={id}
            openModal={openModal}
            alt={tags}
            largeImageURL={largeImageURL}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery;
ImageGallery.propTypes = {
  openModal: PropTypes.func.isRequired,
  imgInfo: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};
