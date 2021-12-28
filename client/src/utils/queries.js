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
`;

export const GET_ABOUT = gql`
  query getAbout {
    getAbout {
      header
      body
      showFeatured
      featuredTrack {
        thumbnailLink
        title
        description
        releaseDate
      }
    }
  }
`;
