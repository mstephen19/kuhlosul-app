import React from 'react';

export default function Header({ children }) {
  return (
    <div
      style={{
        width: '100%',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>{children}</h1>
      <div style={{ width: '80%', height: '1px', background: 'white' }}></div>
    </div>
  );
}
