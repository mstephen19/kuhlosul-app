import React, { useState } from 'react';
import { Box } from 'rebass';
import Icon from './Icon';
import DropDown from './DropDown';

export default function Nav() {
  const [dropdown, toggleDropdown] = useState(false);

  const handleClick = () => {
    toggleDropdown(!dropdown);
    console.log(dropdown);
  };

  return (
    <Box
      style={{
        height: '75px',
        width: '100vw',
        position: 'sticky',
        top: '0',
        right: '0',
        background: '#303134',
        boxShadow: '0 0 20px black',
        display: 'flex',
        alignItems: 'center',
        zIndex: '999',
      }}
    >
      <Icon onClick={handleClick} />
      <DropDown position={dropdown ? 'down' : 'up'} onClick={handleClick} />
    </Box>
  );
}
