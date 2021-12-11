import React, { useEffect } from 'react';
import './dropdown.css';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useGlobalContext } from '../../utils/GlobalContext/GlobalProvider';
import { SET_CURRENT_PAGE } from '../../utils/GlobalContext/actions';

export default function DropDown({ position, onClick }) {
  const { currentPage, dispatch } = useGlobalContext();

  const handleItemClick = ({ target }) => {
    if (target.id !== currentPage) window.scrollTo(0, 0);
    dispatch({
      type: SET_CURRENT_PAGE,
      payload: target.id,
    });
  };

  const handleMerch = (e) => {
    e.preventDefault();
    window.open(
      e.target.getAttribute('data-href'),
      'targetWindow',
      `toolbar=no,
     location=no,
     status=no,
     menubar=no,
     scrollbars=yes,
     resizable=yes,
     width=500px,
     height=700px`
    );
  };

  useEffect(() => {
    document.title = `Kuhlosul - ${currentPage}`;
  }, [currentPage]);

  const links = [
    {
      name: 'Home',
      route: '/',
    },
    {
      name: 'Tracks',
      route: '/tracks',
    },
    {
      name: 'Contact',
      route: '/contact',
    },
  ];

  return (
    <div
      style={{
        width: '100%',
        background: '#121212',
        height: 'calc(100vh - 75px)',
        position: 'fixed',
        top: position === 'down' ? '75px' : '-100%',
        pointerEvents: position === 'down' ? 'all' : 'none',
        transition: 'all 0.3s linear',
        zIndex: '800',
        scrollBehavior: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ul
        style={{
          color: 'white',
          listStyle: 'none',
          fontSize: '2rem',
          width: '100%',
          margin: '0',
          marginTop: '10px',
          padding: '0',
          textAlign: 'center',
        }}
      >
        {links.map((link) => {
          return (
            <Link
              to={link.route}
              onClick={(e) => {
                handleItemClick(e);
                onClick();
              }}
              key={uuidv4()}
            >
              <li
                id={link.name}
                style={{
                  background: currentPage === link.name && '#303134',
                }}
              >
                {link.name}
              </li>
            </Link>
          );
        })}
        <a
          href='https://kuhlosulmerch.bigcartel.com'
          onClick={(e) => {
            handleMerch(e);
            onClick();
          }}
          target='_blank'
          rel='noreferrer'
        >
          <li data-href='https://kuhlosulmerch.bigcartel.com'>Merch</li>
        </a>
      </ul>
    </div>
  );
}
