import React from 'react';
import { useQuery } from '@apollo/client';
import { VIEW_DASHBOARD } from '../utils/queries';
import Loading from '../components/LoadingOverlay/Loading';
import AdminPanel from '../components/AdminPanel/AdminPanel';

export default function AdminDashboard() {
  const { loading, data } = useQuery(VIEW_DASHBOARD);
  const isAdmin = data?.viewdashboard?.isAdmin || false;
  return (
    <>
      {loading && <Loading />}
      {isAdmin ? <AdminPanel /> : <div>You are not an admin.</div>}
    </>
  );
}
