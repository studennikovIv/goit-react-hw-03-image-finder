import React from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
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
