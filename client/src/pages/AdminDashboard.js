import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { VIEW_DASHBOARD } from '../utils/queries';
import Loading from '../components/LoadingOverlay/Loading';
import AdminPanel from '../components/AdminPanel/AdminPanel';
import Auth from '../utils/auth';

export default function AdminDashboard() {
  const { loading, data } = useQuery(VIEW_DASHBOARD);
  const isAdmin = data?.viewdashboard?.isAdmin || false;

  useEffect(() => {
    if (!Auth.loggedIn()) {
      window.location.assign('/login');
    }
  }, []);

  return (
    <>
      {loading && <Loading />}
      {isAdmin ? (
        <AdminPanel />
      ) : (
        <div style={{ color: 'white' }}>You are not an admin.</div>
      )}
    </>
  );
}
