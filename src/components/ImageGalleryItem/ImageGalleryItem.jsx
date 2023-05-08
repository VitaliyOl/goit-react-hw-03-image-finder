import React from 'react';
import { Item, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ item, onImageClick }) {
  const { largeImageURL, tags, webformatURL } = item;

  return (
    <Item
      onClick={e => {
        e.preventDefault();
        onImageClick({ largeImageURL, tags });
      }}
    >
      <Image src={webformatURL} alt={tags} loading="lazy" />
    </Item>
  );
}

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
