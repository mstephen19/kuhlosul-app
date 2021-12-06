import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from 'rebass';
// import Paper from '@mui/material/Paper';

export default function Footer() {
  return (
    <Box
      style={{
        height: '50px',
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
      <Link to='/login'>Admin login</Link>
      <Link to='/contact'>Admin login</Link>
    </Box>
  );
}
