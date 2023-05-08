import React from 'react';
import { ButtonMore } from './Button.styled';

export function Button({ children, onClick = null }) {
  return (
    <ButtonMore type="button" onClick={onClick}>
      {children}
    </ButtonMore>
  );
}
