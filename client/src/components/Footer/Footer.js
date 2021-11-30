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
        background: 'green',
        margin: '0',
        padding: '0,',
      }}
    >
      <Link to='/login'>Admin login</Link>
    </Box>
  );
}
