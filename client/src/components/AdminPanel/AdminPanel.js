import React from 'react';
import KFlexBox from '../Styled/KFlexBox';
import KButton from '../Styled/KButton';
import { useMutation, useQuery } from '@apollo/client';
import { SEED_DATABASE } from '../../utils/mutations';
import Loading from '../LoadingOverlay/Loading';

export default function AdminPanel() {
  const [seed, { error, loading, data }] = useMutation(SEED_DATABASE);

  const handleUpdateDb = async () => {
    try {
      const { data } = await seed();
      if (!data) return alert('Failed to update database');
      return alert('Database updated!');
    } catch (err) {
      alert('Failed to update database.');
    }
  };

  return (
    <KFlexBox>
      {loading && <Loading text='This will take a bit...' />}
      <KButton
        text='Update Database'
        disabled={false}
        onClick={handleUpdateDb}
      />
    </KFlexBox>
  );
}
