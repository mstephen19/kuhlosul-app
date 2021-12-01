import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TRACKS } from '../utils/queries';
import KFlexBox from '../components/Styled/KFlexBox';
import Loading from '../components/LoadingOverlay/Loading';

export default function Tracks() {
  const { loading, data } = useQuery(GET_TRACKS);
  const tracks = data?.tracks || [];
  const allTracksMap = {};
  tracks.forEach((track) => {
    if (!allTracksMap[track.title]) {
      allTracksMap[track.title] = track;
    }
  });
  const allTracks = Object.values(allTracksMap)
    .sort((a, b) => {
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    })
    .filter((track) => {
      return !track.title.toLowerCase().includes('eargsm');
    });

  return (
    <KFlexBox direction='column' width='100vw' height='auto'>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '90vw',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {loading && <Loading />}
        {allTracks.map((track) => {
          return (
            <a
              href={track.url}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '10px',
                width: 'clamp(300px, 80vw, 450px)',
              }}
              key={track._id}
              target='_blank'
              rel='noreferrer'
            >
              <KFlexBox width='75%' height='auto' direction='column'>
                <img
                  src={track.thumbnail}
                  alt={track.title}
                  style={{
                    width: 'clamp(300px, 80vw, 450px)',
                    borderRadius: '5px',
                  }}
                />
                <p style={{ textAlign: 'center' }}>{track.title}</p>
              </KFlexBox>
            </a>
          );
        })}
      </div>
    </KFlexBox>
  );
}
