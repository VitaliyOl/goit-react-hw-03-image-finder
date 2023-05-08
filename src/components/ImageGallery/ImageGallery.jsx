import React, { Component } from 'react';
import { Gallery } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import imagesApi from '../services/fetchApi';
import Modal from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import Loader from '../Loader/Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageGallery extends Component {
  state = {
    value: '',
    images: [],
    error: null,
    status: Status.IDLE,
    page: 1,
    totalPages: 0,
    showModal: false,
    modalData: {},

    loadMores: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevValue = prevProps.value;
    const nextValue = this.props.value;
    const { page, error } = this.state;

    if (prevValue !== nextValue || prevState.page !== page) {
      this.setState({ status: Status.PENDING });

      if (error) {
        this.setState({ error: null });
      }

      imagesApi
        .getImages(nextValue, page)
        .then(images => {
          this.setState(prevState => ({
            images:
              page === 1 ? images.hits : [...prevState.images, ...images.hits],
            status: Status.RESOLVED,
            totalPages: Math.floor(images.totalHits / 12),
          }));
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  togleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  setModalData = modalData => {
    this.setState({ modalData, showModal: true });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, error, status, showModal, modalData, page, totalPages } =
      this.state;
    const { value } = this.props;

    if (status === 'idle') {
      return <h1 style={{ margin: '0 auto' }}>Lets Go!</h1>;
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }
    if (images.length === 0) {
      return (
        <h1>Oops... there are no '{value}' images matching your search... </h1>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <Gallery>
            {images.map(image => (
              <ImageGalleryItem
                key={image.id}
                item={image}
                onImageClick={this.setModalData}
              />
            ))}
          </Gallery>

          {images.length > 0 && status !== 'pending' && page <= totalPages && (
            <Button onClick={this.loadMore}>Load More</Button>
          )}
          {showModal && <Modal data={modalData} onClose={this.togleModal} />}
        </>
      );
    }
  }
}
