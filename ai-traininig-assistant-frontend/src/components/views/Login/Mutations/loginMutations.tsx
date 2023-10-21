/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const LOGIN_USER_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
