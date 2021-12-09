import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from 'rebass';
// import Paper from '@mui/material/Paper';

export default function Footer() {
  return (
    <Box
      style={{
        height: '75px',
        display: 'block',
        position: 'static',
        width: '100vw',
        background: '#303134',
        margin: '0',
        padding: '0,',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Link to='/contact' style={{ height: '1.5rem', cursor: 'pointer' }}>
          <p style={{ fontSize: '1.5rem', cursor: 'pointer' }}>Contact</p>
        </Link>
        <Link to='/login' style={{ height: '1.5rem', cursor: 'pointer' }}>
          <p style={{ fontSize: '1.5rem', cursor: 'pointer' }}>
            Admin Dashboard
          </p>
        </Link>
        <p
          style={{
            fontSize: 'clamp(0.5rem, 2vw, 1rem)',
            position: 'absolute',
            right: '0',
            height: '0',
            cursor: 'pointer',
          }}
        >
          Created with ❤️ by
          <a href='https://github.com/mstephen19'> Matt Stephens</a>
        </p>
      </div>
    </Box>
  );
}
