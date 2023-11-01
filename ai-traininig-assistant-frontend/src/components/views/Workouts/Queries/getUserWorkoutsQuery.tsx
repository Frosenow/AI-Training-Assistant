/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const FETCH_USER_WORKOUTS_QUERY = gql`
  query getUserWorkouts($owner: String!) {
    getUserWorkouts(owner: $owner) {
      owner
      createdAt
      id
      name
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
