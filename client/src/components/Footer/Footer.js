import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from 'rebass';
// import Paper from '@mui/material/Paper';

export default function Footer() {
  return (
    <Box sx={{ height: '100px', width: '100vw', background: 'green' }}>
      <Link to='/login'>Admin login</Link>
    </Box>
  );
}
