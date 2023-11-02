/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const ADD_EXERCISE_MUTATION = gql`
  mutation addToWorkoutSplit(
    $workoutPlanId: ID!
    $exercise: ExerciseSplitInput!
  ) {
    addToWorkoutSplit(workoutPlanId: $workoutPlanId, exercise: $exercise) {
      id
      name
      owner
      createdAt
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
