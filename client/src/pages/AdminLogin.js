import React, { useEffect } from 'react';
import AdminLoginForm from '../components/AdminLoginForm/AdminLoginForm';
import KFlexBox from '../components/Styled/KFlexBox';
import { useQuery } from '@apollo/client';
import { VIEW_DASHBOARD } from '../utils/queries';
import Loading from '../components/LoadingOverlay/Loading';
import Auth from '../utils/auth';

export default function AdminLogin() {
  const { loading, data } = useQuery(VIEW_DASHBOARD);
  const isAdmin = data?.viewdashboard?.isAdmin || false;

  useEffect(() => {
    if (isAdmin && Auth.loggedIn()) window.location.assign('/dashboard');
  }, [data]);

  return (
    <KFlexBox>
      {loading && <Loading />}
      <AdminLoginForm />
    </KFlexBox>
  );
}
