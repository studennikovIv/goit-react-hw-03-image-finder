import React from 'react';
import css from './ImageGalleryItem.module.css';
const ImageGalleryItem = ({
  id,
  webformatURL,
  alt,
  openModal,
  largeImageURL,
}) => {
  return (
    <li id={id} className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItem_image}
        src={webformatURL}
        alt={alt}
        onClick={() => openModal(true, largeImageURL)}
      />
    </li>
  );
};

export default ImageGalleryItem;
