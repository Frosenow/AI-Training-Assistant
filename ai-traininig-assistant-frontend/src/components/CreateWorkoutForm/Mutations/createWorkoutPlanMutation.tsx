/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const CREATE_WORKOUT_PLAN_MUTATION = gql`
  mutation createWorkoutPlan($name: String!) {
    createWorkoutPlan(name: $name) {
      id
      name
      owner
      createdAt
    }
  }
`;
