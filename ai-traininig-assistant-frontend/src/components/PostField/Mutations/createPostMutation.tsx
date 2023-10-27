/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      createdAt
      body
      username
      comments {
        id
        body
        username
      }
      commentsCount
      likes {
        username
      }
      likesCount
    }
  }
`;
