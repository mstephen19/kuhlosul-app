import React from 'react';
import profile from '../assets/profile.jpg';
import KFlexBox from '../components/Styled/KFlexBox';
import Header from '../components/Styled/Header';

export default function Home() {
  return (
    <KFlexBox direction='column' gap='1rem'>
      <Header>I am Kuhlosul</Header>
      <img
        style={{ borderRadius: '100%' }}
        src={profile}
        alt='Kuhlosul Profile'
      />
      <p>I'm a dubstep artist</p>
    </KFlexBox>
  );
}
