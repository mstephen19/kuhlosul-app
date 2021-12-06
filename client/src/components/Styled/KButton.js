import React from 'react';
import './KButton.css';

export default function KButton({ text, disabled, onClick, ...rest }) {
  return (
    <button
      className='k-button'
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {text}
    </button>
  );
}
