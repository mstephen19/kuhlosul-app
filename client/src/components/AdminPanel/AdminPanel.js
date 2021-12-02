import React, { useState } from 'react';
import KFlexBox from '../Styled/KFlexBox';
import KButton from '../Styled/KButton';
import { useMutation, useQuery } from '@apollo/client';
import { SEED_DATABASE } from '../../utils/mutations';
import Loading from '../LoadingOverlay/Loading';
import PasswordModal from './PasswordModal';
import Auth from '../../utils/auth';

// Later on below the update database button, have a list of all tracks currently in the db
export default function AdminPanel() {
  const [seed, { error, loading, data }] = useMutation(SEED_DATABASE);
  const [modalShow, setModalShow] = useState(false);

  const handleUpdateDb = async () => {
    try {
      const { data } = await seed();
      if (!data) return alert('Failed to update database');
      return alert('Database updated!');
    } catch (err) {
      alert('Failed to update database.');
    }
  };

  const handleLogOut = () => {
    Auth.logout();
  };

  return (
    <KFlexBox>
      {loading && <Loading text='This will take a bit...' />}
      <KButton
        text='Update Database'
        disabled={loading ? true : false}
        onClick={handleUpdateDb}
      />
      <KButton text='Log Out' disabled={false} onClick={handleLogOut} />
      <KButton
        text='Change Password'
        disabled={false}
        onClick={() => setModalShow(true)}
      />
      <PasswordModal show={modalShow} onHide={() => setModalShow(false)} />
    </KFlexBox>
  );
}
