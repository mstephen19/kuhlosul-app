import React, { useState } from 'react';
import { Box } from 'rebass';
import Icon from './Icon';
import DropDown from './DropDown';
import logoWhite from '../../assets/logowhite.png';

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
        zIndex: '900',
      }}
    >
      <Icon onClick={handleClick} animated={dropdown ? true : false} />
      <DropDown position={dropdown ? 'down' : 'up'} onClick={handleClick} />
      <div style={{ width: 'calc(100vw - 70px)' }}>
        <div
          style={{
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            marginRight: '70px',
          }}
        >
          <img
            src={logoWhite}
            alt='Logo'
            style={{ objectFit: 'cover', height: '500%' }}
          />
        </div>
      </div>
    </Box>
  );
}
