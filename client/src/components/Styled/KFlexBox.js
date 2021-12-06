import React from 'react';

export default function KFlexBox({
  width,
  height,
  direction,
  children,
  evenly,
  onChange,
  background = 'none',
  overflow = 'inherit',
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: !evenly ? 'center' : 'space-evenly',
        alignItems: 'center',
        flexDirection: direction === 'column' ? 'column' : 'row',
        width: width,
        height: height,
        color: 'white',
        background: background,
        overflow: overflow,
      }}
      onChange={onChange}
    >
      {children}
    </div>
  );
}
