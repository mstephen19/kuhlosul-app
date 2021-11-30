import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      admin {
        _id
        email
      }
    }
  }
`;

export const SEED_DATABASE = gql`
  mutation seed {
    seed {
      title
    }
  }
`;
