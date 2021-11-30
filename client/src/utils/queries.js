import { gql } from '@apollo/client';

export const VIEW_DASHBOARD = gql`
  query viewdashboard {
    viewdashboard {
      isAdmin
    }
  }
`;
