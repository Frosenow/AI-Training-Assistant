/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
