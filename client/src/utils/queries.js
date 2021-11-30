import { gql } from '@apollo/client';

export const VIEW_DASHBOARD = gql`
  query viewdashboard {
    viewdashboard {
      isAdmin
    }
  }
`;

export const GET_TRACKS = gql`
  query tracks {
    tracks {
      _id
      title
      thumbnail
      url
      publishedAt
      genre
    }
  }
`
