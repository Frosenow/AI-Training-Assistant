/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const DELETE_WORKOUT_PLAN_MUTATION = gql`
  mutation deleteWorkoutPlan($workoutPlanId: ID!) {
    deleteWorkoutPlan(workoutPlanId: $workoutPlanId)
  }
`;
