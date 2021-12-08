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
  wrap,
  gap = '0',
  overflowY,
  minHeight,
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
        flexWrap: wrap ? 'wrap' : 'nowrap',
        gap: gap,
        overflowY: overflowY,
        minHeight: minHeight,
      }}
      onChange={onChange}
    >
      {children}
    </div>
  );
}
