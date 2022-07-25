import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL, modalImageLoad}) => {
  return (
    <li>
      <img
        className='galleryImage'
        alt={tags}
        src={webformatURL}
        data-source={largeImageURL}
        onClick={()=> modalImageLoad(largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  modalImageLoad: PropTypes.func.isRequired,
};

export default ImageGalleryItem;