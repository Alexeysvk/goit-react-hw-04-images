import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClickModal();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClickModal();
    }
  };

  render() {
    const { image } = this.props;
    return createPortal(
      <div className='overlay' onClick={this.handleBackdropClick}>
        <div className='container'>
          <img className='modalImage'src={image} alt={image.tags} />
        </div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onClickModal: PropTypes.func.isRequired,

};