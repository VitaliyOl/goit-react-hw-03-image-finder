import { Container } from './App.styled';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

import React, { Component } from 'react';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  handleFormSubmit = value => {
    this.setState({ searchQuery: value });
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery value={this.state.searchQuery} />

        <ToastContainer />
      </Container>
    );
  }
}
