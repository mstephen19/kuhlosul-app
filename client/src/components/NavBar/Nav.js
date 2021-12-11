import React, { useState } from 'react';
import { Box } from 'rebass';
import Icon from './Icon';
import DropDown from './DropDown';
import logoWhite from '../../assets/logowhite.webp';
import { Link } from 'react-router-dom';
import './navlogo.css';

export default function Nav() {
  const [dropdown, toggleDropdown] = useState(false);

  const handleClick = () => {
    toggleDropdown(!dropdown);
  };

  return (
    <>
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
        <Icon
          onClick={() => handleClick()}
          animated={dropdown ? true : false}
        />
        <div style={{ width: 'calc(100vw - 70px)' }}>
          <Link to='/' style={{ cursor: 'default' }}>
            <div
              style={{
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                marginRight: '70px',
                pointerEvents: 'none',
                cursor: 'default',
              }}
            >
              <img
                className='navLogo'
                src={logoWhite}
                alt='Logo'
                style={{
                  objectFit: 'cover',
                  height: '500%',
                  cursor: 'pointer',
                  pointerEvents: 'initial',
                }}
              />
            </div>
          </Link>
        </div>
      </Box>
      <DropDown position={dropdown ? 'down' : 'up'} onClick={handleClick} />
    </>
  );
}
