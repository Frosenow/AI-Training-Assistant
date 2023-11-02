/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const DELETE_EXERCISE_MUTATION = gql`
  mutation deleteExerciseFromWorkoutPlan(
    $workoutPlanId: ID!
    $exerciseId: ID!
    $exerciseDay: String!
  ) {
    deleteFromWorkoutSplit(
      workoutPlanId: $workoutPlanId
      exerciseId: $exerciseId
      exerciseDay: $exerciseDay
    ) {
      id
      workoutSplit {
        monday {
          exerciseName
          muscleGroup
          reps
          sets
          id
        }
        tuesday {
          exerciseName
          muscleGroup
          reps
          sets
          id
        }
        wednesday {
          exerciseName
          muscleGroup
          reps
          sets
          id
        }
        thursday {
          exerciseName
          muscleGroup
          reps
          sets
          id
        }
        friday {
          exerciseName
          muscleGroup
          reps
          sets
          id
        }
        saturday {
          exerciseName
          muscleGroup
          reps
          sets
          id
        }
        sunday {
          exerciseName
          muscleGroup
          reps
          sets
          id
        }
      }
    }
  }
`;
