import React from 'react';
import profile from '../assets/profile2.jpg';
import KFlexBox from '../components/Styled/KFlexBox';
import Header from '../components/Styled/Header';

export default function Home() {
  return (
    <KFlexBox direction='column' gap='1rem'>
      <Header>I am Kuhlosul</Header>
      <KFlexBox width='100%'>
        <KFlexBox width='90%' gap='3rem' wrap>
          <img
            style={{
              borderRadius: '100%',
              width: 'clamp(80%, 50%, 500px)',
              maxWidth: '500px',
              boxShadow: '-5px 5px 0px white',
            }}
            src={profile}
            alt='Kuhlosul Profile'
          />
          <p
            style={{
              flex: '1 0 50%',
              maxWidth: '80%',
              fontSize: '25px',
              textAlign: 'center',
            }}
          >
            Hailing from Kelowna B.C. Canada, Kuhlosul is an up-and-coming bass
            producer who made his musical debut four years ago. Kuhlosul
            provides his audience with a unique and ghastly take on dubstep,
            focusing on all things weird and wobbly. Kuhlosul has released music
            with reputable labels in the past including Emengy, High Caliber
            Records, and Hybrid Trap. Furthermore, he has garnered support from
            well-respected artists such as Riot Ten, Minesweepa, Gawm, GlObal,
            Bassgazm, and more. His persistence and determination have allowed
            him to perfect his craft and channel his own distinctive sound
            within his work.
          </p>
        </KFlexBox>
      </KFlexBox>
    </KFlexBox>
  );
}
