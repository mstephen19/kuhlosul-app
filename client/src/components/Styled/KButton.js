import React from 'react';
import './KButton.css';

export default function KButton({ text, disabled, onClick, ...rest }) {
  return (
    <button
      className='k-button'
      style={{ fontSize: '1.5rem' }}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {text}
    </button>
  );
}
