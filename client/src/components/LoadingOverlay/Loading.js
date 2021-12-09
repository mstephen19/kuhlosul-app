import React from 'react';
import logo from '../../assets/vikingLogo.png';
import './loading.css';

export default function Loading() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        color: 'black',
        transform: 'translate(-50%, -50%)',
        fontSize: '2rem',
        width: 'auto',
        height: 'auto',
        textAlign: 'center',
        zIndex: '999',
        background: 'none',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        className='loadingLogo'
        src={logo}
        alt='Loading'
        style={{ width: 'clamp(150px, 25vw, 300px)' }}
      />
    </div>
  );
}
