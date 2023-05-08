import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import { Searchbars, Form, Button, Input } from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleNameChange = e => {
    this.setState({ inputValue: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.inputValue.trim() === '') {
      alert('please write some thing.');
      return;
    }

    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  };
  render() {
    return (
      <Searchbars>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <BsSearch />
          </Button>

          <Input
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
            onChange={this.handleNameChange}
          />
        </Form>
      </Searchbars>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
