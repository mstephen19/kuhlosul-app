import React from 'react';
import KFlexBox from '../Styled/KFlexBox';
import Timer from './Timer';

export default function FeaturedTrack({ thumbnailLink, title, description, releaseDate }) {
  return (
    <KFlexBox
      width='80%'
      height='clamp(200px, 35vh, 300px)'
      background='grey'
      wrap='wrap'
      sx={{ borderRadius: '5px', marginTop: '5px', overflow: 'hidden' }}
      overflowY='hidden'
    >
      <div
        style={{
          height: '100%',
          width: '40%',
          background: 'yellow',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <img src={thumbnailLink} alt={title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>
      <div style={{ height: '100%', width: '60%' }}>
        <div
          style={{
            height: '65%',
            width: '100%',
            background: 'green',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div
          style={{
            height: '35%',
            flex: '0 1 100%',
            minWidth: '100px',
            background: 'red',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Timer releaseDate={releaseDate} />
        </div>
      </div>
    </KFlexBox>
  );
}
