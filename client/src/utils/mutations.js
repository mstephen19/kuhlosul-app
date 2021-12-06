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

export const CHANGE_PASSWORD = gql`
  mutation changePassword($password: String!) {
    changePassword(password: $password) {
      _id
      email
    }
  }
`;

export const CREATE_ADMIN = gql`
  mutation createAdmin($email: String!, $password: String!) {
    createAdmin(email: $email, password: $password) {
      _id
      email
    }
  }
`;
