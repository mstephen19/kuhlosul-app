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
    <KFlexBox direction='column' width='100%' height='100%'>
      {loading && <Loading />}
      {allTracks.map((track) => {
        return <img src={track.thumbnail} />;
      })}
    </KFlexBox>
  );
}
