import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from 'rebass';
// import Paper from '@mui/material/Paper';

export default function Footer() {
  return (
    <Box
      style={{
        height: '75px',
        width: '100vw',
        background: '#303134',
        margin: '0',
        padding: '0,',
        display: 'flex',
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
        <Link to='/contact'>Contact</Link>
        <Link to='/login'>Admin Dashboard</Link>
        <p style={{ fontSize: '0.75rem' }}>
          Created with ❤️ by
          <a href='https://github.com/mstephen19'> Matt Stephens</a>
        </p>
      </div>
    </Box>
  );
}
