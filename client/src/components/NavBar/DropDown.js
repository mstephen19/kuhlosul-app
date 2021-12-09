import React, { useReducer } from 'react';
import './dropdown.css';
import { Link } from 'react-router-dom';
import { uuid } from 'uuidv4';
import { useGlobalContext } from '../../utils/GlobalContext/GlobalProvider';
import { SET_CURRENT_PAGE } from '../../utils/GlobalContext/actions';
import { reducer } from '../../utils/GlobalContext/reducers';

export default function DropDown({ position, onClick }) {
  const initialState = useGlobalContext();

  const [{ currentPage }, dispatch] = useReducer(reducer, initialState);

  const handleItemClick = ({ target }) => {
    dispatch({
      type: SET_CURRENT_PAGE,
      payload: target.id,
    });
  };

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
        position: 'absolute',
        bottom: position === 'down' ? 'calc(-100vh + 75px)' : '100vh',
        pointerEvents: position === 'down' ? 'all' : 'none',
        transition: 'all 0.3s linear',
        zIndex: '-100',
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
              key={uuid()}
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
          onClick={onClick}
          target='_blank'
          rel='noreferrer'
        >
          <li>Merch</li>
        </a>
      </ul>
    </div>
  );
}
