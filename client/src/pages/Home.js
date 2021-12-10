import React from 'react';
import profile from '../assets/profile2.jpg';
import KFlexBox from '../components/Styled/KFlexBox';
import Header from '../components/Styled/Header';
import { useQuery } from '@apollo/client';
import { GET_ABOUT } from '../utils/queries';
import Loading from '../components/LoadingOverlay/Loading';

export default function Home() {

  const { loading, data } = useQuery(GET_ABOUT);

  const info = data?.getAbout || {};

  return (
    <KFlexBox direction='column' gap='1rem' minHeight='calc(100vh - 75px)'>
      {loading && <Loading />}
      <Header>{info.header}</Header>
      <KFlexBox width='100%'>
        <KFlexBox width='90%' gap='3rem' wrap>
          <img
            style={{
              borderRadius: '100%',
              width: 'clamp(80%, 50%, 500px)',
              maxWidth: '500px',
              boxShadow: '-10px 10px 0px white',
            }}
            src={profile}
            alt='Kuhlosul Profile'
          />
          <p
            style={{
              flex: '1 0 50%',
              maxWidth: '80%',
              fontSize: 'clamp(25px, 2.5vw, 30px)',
              textAlign: 'center',
            }}
          >
            {info.body}
          </p>
        </KFlexBox>
      </KFlexBox>
    </KFlexBox>
  );
}
