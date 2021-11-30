import React from 'react';
import { useQuery } from '@apollo/client';
import { VIEW_DASHBOARD } from '../utils/queries';
import KFlexBox from '../components/Styled/KFlexBox';

export default function AdminDashboard() {
  const { loading, data } = useQuery(VIEW_DASHBOARD);
  const isAdmin = data?.viewdashboard?.isAdmin || false;
  return (
    <KFlexBox>
      {loading && <div>loading</div>}
      {isAdmin ? <div>ayyeee</div> : <div>You're not an admin</div>}
    </KFlexBox>
  );
}
