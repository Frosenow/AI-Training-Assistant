/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        createdAt
        body
        username
      }
      commentsCount
    }
  }
`;
