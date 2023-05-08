import React from 'react';
import { ButtonMore } from './Button.styled';
import PropTypes from 'prop-types';

export function Button({ children, onClick = null }) {
  return (
    <ButtonMore type="button" onClick={onClick}>
      {children}
    </ButtonMore>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
};
