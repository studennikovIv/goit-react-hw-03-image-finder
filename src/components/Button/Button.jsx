import React from 'react';
import css from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button className={css.Button} onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;
