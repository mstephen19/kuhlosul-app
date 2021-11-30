import React from 'react';

export default function KFlexBox({
  width,
  height,
  direction,
  children,
  evenly,
  onChange,
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
      }}
      onChange={onChange}
    >
      {children}
    </div>
  );
}
