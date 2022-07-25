import  { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal ({ image, onClick }){
useEffect(()=>{
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClick();
    }
  }

  window.addEventListener('keydown', handleKeyDown);
  return () =>{window.removeEventListener('keydown', handleKeyDown)}
}, [onClick])


const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
     onClick();
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
  image:PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired, 
};