import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL, onClickItem,}) => {
  return (
    <li >
      <img
        className='galleryImage'
        alt={tags}
        src={webformatURL}
        data-source={largeImageURL}
        onClick={onClickItem}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClickItem: PropTypes.func.isRequired,
};

export default ImageGalleryItem;