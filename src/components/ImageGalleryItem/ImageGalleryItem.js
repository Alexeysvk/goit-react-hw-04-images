import PropTypes from 'prop-types';

const ImageGalleryItem = ({ id, webformatURL, tags, largeImageURL, modalImageLoad}) => {
  return (
    <li key= {id}>
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
  id: PropTypes.number,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClickItem: PropTypes.func.isRequired,
};

export default ImageGalleryItem;