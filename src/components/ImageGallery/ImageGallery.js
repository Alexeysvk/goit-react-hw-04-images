import ImageGalleryItem from '../ImageGalleryItem';
import PropTypes from 'prop-types';

function ImageGallery({ toggleModal, images, modalImageLoad }) {
  return (
    <ul>
      {images.map(({ id, tags, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          tags={tags}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          onClickItem={toggleModal}
          modalImageLoad={modalImageLoad}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  id: PropTypes.number,
  images: PropTypes.array,
  toggleModal: PropTypes.func.isRequired,
};

export default ImageGallery;