import  { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal ({ image, tags, onClickModal, webformatURL }){
useEffect(()=>{
  window.addEventListener('keydown', handleKeyDown);
  return () =>{window.removeEventListener('keydown', handleKeyDown)}
}, [])

const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClickModal();
    }
  };

const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
     onClickModal();
    }
  };


return createPortal(
    <div className='overlay' onClick={handleBackdropClick}>
      <div className='container'>
        <img className='modalImage'src={image} alt={image.tags} />
      </div>
    </div>,
    modalRoot,
    );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func, 
};