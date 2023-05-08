import React, { Component } from 'react';
import { Overlay, Container } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === `Escape`) {
      this.props.onClose();
    }
  };

  handleBackdropeClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.data;
    return createPortal(
      <Overlay onClick={this.handleBackdropeClick}>
        <Container>
          <img src={largeImageURL} alt={tags} />
        </Container>
      </Overlay>,
      modalRoot
    );
  }
}
