/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const FETCH_POSTS_QUERY = gql`
  query getPosts {
    getPosts {
      id
      createdAt
      body
      username
      comments {
        id
        body
        username
        createdAt
      }
      commentsCount
      likes {
        username
      }
      likesCount
    }
  }
`;
