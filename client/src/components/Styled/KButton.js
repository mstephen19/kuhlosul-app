import React from 'react';
import './KButton.css';

export default function KButton({ text, disabled, onClick }) {
  return (
    <button className='k-button' disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
}
