import { gql } from '@apollo/client';

export const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      admin {
        _id
        email
      }
    }
  }
`;
